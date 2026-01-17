# Design Document: Cloud Storage Integration

## Overview

This design implements serverless file storage for CampusCred using Firebase Cloud Storage. The system enables students to upload profile images, videos, and audio files, while recruiters and TPOs can securely access these files. All operations are client-side with security enforced through Firebase Security Rules and Firestore metadata tracking.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  File Upload Component                               │   │
│  │  - File selection & validation                       │   │
│  │  - Progress tracking                                 │   │
│  │  - Error handling                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  File Display Component                              │   │
│  │  - Retrieve & render files                           │   │
│  │  - Display metadata                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Firebase Authentication                         │
│  - Verify user identity                                     │
│  - Provide auth tokens for Cloud Storage access             │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Cloud Storage    │ │   Firestore      │ │  Security Rules  │
│                  │ │                  │ │                  │
│ users/{userId}/  │ │ files collection │ │ - Auth checks    │
│  - profile/      │ │ - metadata docs  │ │ - Path validation│
│  - videos/       │ │ - file refs      │ │ - Size limits    │
│  - audio/        │ │                  │ │ - Type checks    │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

## Components and Interfaces

### 1. FileUploadService

Handles all file upload operations with validation and progress tracking.

```typescript
interface FileUploadService {
  // Upload a file to Cloud Storage
  uploadFile(
    file: File,
    userId: string,
    fileType: 'profile' | 'video' | 'audio'
  ): Promise<UploadResult>
  
  // Cancel an ongoing upload
  cancelUpload(uploadId: string): void
  
  // Subscribe to upload progress
  onProgress(uploadId: string, callback: (progress: number) => void): void
}

interface UploadResult {
  downloadUrl: string
  filePath: string
  metadata: FileMetadata
}

interface FileMetadata {
  fileName: string
  fileSize: number
  contentType: string
  uploadedAt: Timestamp
  userId: string
}
```

### 2. FileRetrievalService

Handles file retrieval and display operations.

```typescript
interface FileRetrievalService {
  // Get file download URL
  getFileUrl(filePath: string): Promise<string>
  
  // Get file metadata from Firestore
  getFileMetadata(fileId: string): Promise<FileMetadata>
  
  // List all files for a user
  listUserFiles(userId: string): Promise<FileMetadata[]>
  
  // Check if user has access to file
  canAccessFile(userId: string, filePath: string): Promise<boolean>
}
```

### 3. FileManagementService

Handles file deletion and metadata management.

```typescript
interface FileManagementService {
  // Delete a file from Cloud Storage and Firestore
  deleteFile(filePath: string, userId: string): Promise<void>
  
  // Update file metadata
  updateFileMetadata(fileId: string, metadata: Partial<FileMetadata>): Promise<void>
  
  // Verify file ownership
  verifyFileOwnership(filePath: string, userId: string): Promise<boolean>
}
```

### 4. FileValidationService

Validates files before upload.

```typescript
interface FileValidationService {
  // Validate file type
  isValidFileType(file: File): boolean
  
  // Validate file size
  isValidFileSize(file: File): boolean
  
  // Get file category (image, video, audio)
  getFileCategory(file: File): 'image' | 'video' | 'audio' | null
  
  // Get MIME type
  getMimeType(file: File): string
}

interface ValidationConfig {
  maxFileSize: 100 * 1024 * 1024 // 100MB
  supportedFormats: {
    image: ['image/jpeg', 'image/png']
    video: ['video/mp4', 'video/quicktime']
    audio: ['audio/mpeg', 'audio/wav']
  }
}
```

## Data Models

### FileMetadata Document (Firestore)

```typescript
interface FileMetadataDoc {
  id: string // Document ID
  userId: string // Owner of the file
  fileName: string // Original file name
  fileSize: number // Size in bytes
  contentType: string // MIME type
  fileType: 'profile' | 'video' | 'audio' // Category
  filePath: string // Path in Cloud Storage
  uploadedAt: Timestamp // Upload timestamp
  updatedAt: Timestamp // Last update timestamp
  downloadUrl: string // Signed download URL (optional)
  isPublic: boolean // Whether file is publicly accessible
}
```

### Cloud Storage Structure

```
campuscred-bucket/
├── users/
│   ├── {userId}/
│   │   ├── profile/
│   │   │   └── {fileName}
│   │   ├── videos/
│   │   │   └── {fileName}
│   │   └── audio/
│   │       └── {fileName}
```

## Security Rules

### Cloud Storage Security Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload to their own directory
    match /users/{userId}/{fileType}/{fileName} {
      allow read: if request.auth != null && 
                     (request.auth.uid == userId || 
                      canAccessUserProfile(userId));
      
      allow write: if request.auth != null && 
                      request.auth.uid == userId &&
                      isValidFileType(fileType, resource.contentType) &&
                      resource.size < 100 * 1024 * 1024;
      
      allow delete: if request.auth != null && 
                       request.auth.uid == userId;
    }
    
    // Deny all other access
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
  
  // Helper functions
  function isValidFileType(fileType, contentType) {
    return (fileType == 'profile' && 
            contentType in ['image/jpeg', 'image/png']) ||
           (fileType == 'videos' && 
            contentType in ['video/mp4', 'video/quicktime']) ||
           (fileType == 'audio' && 
            contentType in ['audio/mpeg', 'audio/wav']);
  }
  
  function canAccessUserProfile(userId) {
    // Check if current user is recruiter/TPO with access
    return get(/databases/(default)/documents/users/$(request.auth.uid))
      .data.role in ['recruiter', 'tpo'];
  }
}
```

### Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Files collection - metadata tracking
    match /files/{fileId} {
      allow read: if request.auth != null && 
                     (request.auth.uid == resource.data.userId ||
                      canAccessUserProfile(resource.data.userId));
      
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId &&
                       validateFileMetadata(request.resource.data);
      
      allow update: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
      
      allow delete: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
    }
    
    // Helper functions
    function validateFileMetadata(data) {
      return data.keys().hasAll(['userId', 'fileName', 'fileSize', 
                                 'contentType', 'fileType', 'filePath']) &&
             data.fileSize > 0 &&
             data.fileSize < 100 * 1024 * 1024;
    }
    
    function canAccessUserProfile(userId) {
      return get(/databases/(default)/documents/users/$(request.auth.uid))
        .data.role in ['recruiter', 'tpo'];
    }
  }
}
```

## Error Handling

### Upload Errors

- **File too large**: Display "File exceeds 100MB limit"
- **Invalid file type**: Display "File type not supported. Please upload JPEG, PNG, MP4, MOV, MP3, or WAV"
- **Network error**: Display "Upload failed. Check your connection and try again"
- **Storage quota exceeded**: Display "Storage quota exceeded. Please delete some files"
- **Authentication failed**: Display "You must be logged in to upload files"

### Retrieval Errors

- **File not found**: Display "File no longer exists"
- **Access denied**: Display "You don't have permission to access this file"
- **Network error**: Display "Failed to load file. Please try again"
- **Invalid file path**: Display "Invalid file reference"

### Deletion Errors

- **File not found**: Display "File not found"
- **Access denied**: Display "You can only delete your own files"
- **Metadata mismatch**: Display "File metadata inconsistent. Please refresh and try again"

## Testing Strategy

### Unit Tests

- File validation (type, size, format)
- Metadata document creation and updates
- File path generation
- Error message formatting
- Access control verification

### Property-Based Tests

Property-based tests will verify universal correctness properties across many generated inputs.

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Upload Round Trip

**For any** valid file (image, video, or audio), uploading it to Cloud Storage and then retrieving it should produce a file with identical content and metadata.

**Validates: Requirements 1.1, 1.4, 2.1**

### Property 2: File Type Validation

**For any** file with an unsupported MIME type, the upload validation should reject it before attempting to upload to Cloud Storage.

**Validates: Requirements 1.2, 1.6**

### Property 3: File Size Enforcement

**For any** file exceeding 100MB, the upload should be rejected and the file should not appear in Cloud Storage or Firestore.

**Validates: Requirements 1.1, 1.5**

### Property 4: Metadata Consistency

**For any** successfully uploaded file, the metadata stored in Firestore should match the file properties in Cloud Storage (name, size, content type, upload timestamp).

**Validates: Requirements 6.1, 6.2**

### Property 5: Access Control Enforcement

**For any** file owned by a user, only that user or authorized recruiters/TPOs should be able to retrieve it; all other users should receive access denied errors.

**Validates: Requirements 3.1, 3.2, 3.4**

### Property 6: Deletion Consistency

**For any** deleted file, it should no longer exist in Cloud Storage, and its metadata should be removed from Firestore.

**Validates: Requirements 4.2, 4.3, 6.4**

### Property 7: File Type Detection

**For any** uploaded file, the system should correctly identify its type (image, video, or audio) based on MIME type or file extension.

**Validates: Requirements 7.4, 7.5**

### Property 8: Upload Progress Accuracy

**For any** file upload, the reported progress percentage should monotonically increase from 0 to 100 and accurately reflect the bytes transferred.

**Validates: Requirements 5.1**

