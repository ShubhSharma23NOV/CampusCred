# Requirements Document: Cloud Storage Integration

## Introduction

CampusCred needs to store and retrieve user-generated files including images, audio, and video without server-side code. This feature enables students to upload profile pictures, video testimonials, and audio recordings, while recruiters and TPOs can access these files securely. Firebase Cloud Storage provides a scalable, serverless solution for this requirement.

## Glossary

- **Cloud Storage**: Firebase Cloud Storage service for storing user-generated files
- **Storage Bucket**: The container for all files in Cloud Storage
- **Security Rules**: Firebase rules that control read/write access to files
- **File Metadata**: Information about a file (name, size, content type, upload date)
- **Upload**: The process of sending a file from client to Cloud Storage
- **Download**: The process of retrieving a file from Cloud Storage to client
- **File Path**: The location of a file within the storage bucket (e.g., `users/{userId}/profile.jpg`)
- **Content Type**: The MIME type of a file (e.g., `image/jpeg`, `audio/mp3`)
- **User**: A person using the CampusCred platform (student, recruiter, or TPO)
- **File Size Limit**: Maximum allowed size for uploaded files
- **Supported File Types**: Image, audio, and video formats that the system accepts

## Requirements

### Requirement 1: Upload User-Generated Files

**User Story:** As a student, I want to upload images, audio, and video files to my profile, so that I can showcase my work and credentials.

#### Acceptance Criteria

1. WHEN a user selects a file from their device and initiates upload THEN the system SHALL accept files up to 100MB in size
2. WHEN a user uploads a file THEN the system SHALL validate the file type against supported formats (JPEG, PNG, MP4, MOV, MP3, WAV)
3. WHEN a file upload is initiated THEN the system SHALL store the file in Cloud Storage at path `users/{userId}/{fileType}/{fileName}`
4. WHEN a file is successfully uploaded THEN the system SHALL return the file's download URL and metadata (name, size, upload timestamp)
5. IF a file exceeds the size limit THEN the system SHALL reject the upload and display an error message to the user
6. IF a file has an unsupported type THEN the system SHALL reject the upload and display an error message to the user

### Requirement 2: Retrieve and Display User Files

**User Story:** As a recruiter, I want to view student profile files (images, videos, audio), so that I can evaluate their credentials and qualifications.

#### Acceptance Criteria

1. WHEN a user requests to view a file THEN the system SHALL retrieve the file from Cloud Storage using the stored file path
2. WHEN a file is retrieved THEN the system SHALL display it in the appropriate format (image in img tag, video in video tag, audio in audio tag)
3. WHEN a file is displayed THEN the system SHALL include file metadata (upload date, file size, file name)
4. IF a file no longer exists in Cloud Storage THEN the system SHALL display a "File not found" message
5. IF a user lacks permission to view a file THEN the system SHALL deny access and display an error message

### Requirement 3: Manage File Access and Permissions

**User Story:** As a system administrator, I want to control who can upload and download files, so that I can maintain security and privacy.

#### Acceptance Criteria

1. WHEN a user attempts to upload a file THEN the system SHALL verify the user is authenticated before allowing the upload
2. WHEN a user attempts to download a file THEN the system SHALL verify the user has permission to access that file
3. WHEN a student uploads a file to their profile THEN the system SHALL restrict access to authenticated users only
4. WHEN a recruiter requests a student's file THEN the system SHALL verify the recruiter has access to that student's profile before granting access
5. WHERE file access is restricted THEN the system SHALL enforce access control through Cloud Storage security rules

### Requirement 4: Delete and Manage Files

**User Story:** As a student, I want to delete files from my profile, so that I can manage my uploaded content.

#### Acceptance Criteria

1. WHEN a user requests to delete a file THEN the system SHALL verify the user owns the file before allowing deletion
2. WHEN a file is deleted THEN the system SHALL remove it from Cloud Storage permanently
3. WHEN a file is deleted THEN the system SHALL remove associated metadata from the database
4. IF a user attempts to delete a file they don't own THEN the system SHALL deny the request and display an error message
5. WHEN a file is deleted THEN the system SHALL confirm the deletion to the user

### Requirement 5: Handle Upload Progress and Errors

**User Story:** As a user, I want to see upload progress and receive clear error messages, so that I understand what's happening with my file uploads.

#### Acceptance Criteria

1. WHEN a file is being uploaded THEN the system SHALL display upload progress as a percentage (0-100%)
2. WHEN an upload fails THEN the system SHALL display a descriptive error message explaining the failure reason
3. WHEN an upload is interrupted THEN the system SHALL allow the user to retry the upload
4. IF network connectivity is lost during upload THEN the system SHALL pause the upload and allow resumption when connection is restored
5. WHEN an upload completes successfully THEN the system SHALL display a success message with the file details

### Requirement 6: Store File Metadata

**User Story:** As a system administrator, I want to track file metadata in the database, so that I can manage and query files efficiently.

#### Acceptance Criteria

1. WHEN a file is uploaded THEN the system SHALL store metadata in Firestore including: file name, file size, content type, upload timestamp, and user ID
2. WHEN file metadata is stored THEN the system SHALL create a document in the `files` collection with the file path as reference
3. WHEN a user queries their files THEN the system SHALL retrieve metadata from Firestore to display file lists
4. WHEN a file is deleted THEN the system SHALL remove the corresponding metadata document from Firestore
5. THE File_Metadata_Store SHALL maintain consistency between Cloud Storage files and Firestore metadata records

### Requirement 7: Support Multiple File Types

**User Story:** As a student, I want to upload different types of files (images, videos, audio), so that I can showcase various aspects of my profile.

#### Acceptance Criteria

1. WHEN a user uploads an image file THEN the system SHALL accept JPEG and PNG formats
2. WHEN a user uploads a video file THEN the system SHALL accept MP4 and MOV formats
3. WHEN a user uploads an audio file THEN the system SHALL accept MP3 and WAV formats
4. WHEN a file is uploaded THEN the system SHALL detect the file type from the file extension or MIME type
5. WHEN displaying a file THEN the system SHALL render it using the appropriate HTML element based on file type

