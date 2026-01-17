# Implementation Plan: Cloud Storage Integration

## Overview

This implementation plan breaks down the Cloud Storage Integration feature into discrete, manageable tasks. The system will be built incrementally, starting with core services, then adding UI components, and finally integrating everything together. Each task builds on previous work with no orphaned code.

## Tasks

- [ ] 1. Set up project structure and core types
  - Create `src/services/storage/` directory structure
  - Define TypeScript interfaces for FileUploadService, FileRetrievalService, FileManagementService, and FileValidationService
  - Create `src/types/storage.ts` with FileMetadata and related types
  - Set up Firebase Storage and Firestore references in `src/lib/firebase.js`
  - _Requirements: 1.1, 2.1, 3.1, 6.1_

- [ ] 2. Implement FileValidationService
  - Create `src/services/storage/FileValidationService.ts`
  - Implement file type validation (JPEG, PNG, MP4, MOV, MP3, WAV)
  - Implement file size validation (max 100MB)
  - Implement file category detection (image, video, audio)
  - Implement MIME type detection
  - _Requirements: 1.2, 1.6, 7.1, 7.2, 7.3, 7.4_

- [ ] 2.1 Write property test for FileValidationService
  - **Property 2: File Type Validation**
  - **Validates: Requirements 1.2, 1.6**
  - Test that unsupported file types are rejected
  - Test that supported file types are accepted

- [ ] 2.2 Write unit tests for FileValidationService
  - Test edge cases for file size boundaries
  - Test MIME type detection accuracy
  - Test file category detection for all supported formats

- [ ] 3. Implement FileUploadService
  - Create `src/services/storage/FileUploadService.ts`
  - Implement uploadFile() with authentication check
  - Implement file path generation (`users/{userId}/{fileType}/{fileName}`)
  - Implement progress tracking with onProgress() callback
  - Implement error handling for upload failures
  - Implement metadata return (downloadUrl, filePath, metadata)
  - _Requirements: 1.1, 1.3, 1.4, 3.1, 5.1, 5.2_

- [ ] 3.1 Write property test for FileUploadService
  - **Property 1: Upload Round Trip**
  - **Validates: Requirements 1.1, 1.4, 2.1**
  - Test that uploaded files can be retrieved with identical content
  - Test that metadata is correctly returned

- [ ] 3.2 Write property test for file size enforcement
  - **Property 3: File Size Enforcement**
  - **Validates: Requirements 1.1, 1.5**
  - Test that files exceeding 100MB are rejected
  - Test that files under 100MB are accepted

- [ ] 3.3 Write unit tests for FileUploadService
  - Test upload progress tracking accuracy
  - Test error messages for various failure scenarios
  - Test file path generation for different file types

- [ ] 4. Implement FileRetrievalService
  - Create `src/services/storage/FileRetrievalService.ts`
  - Implement getFileUrl() to retrieve download URLs
  - Implement getFileMetadata() from Firestore
  - Implement listUserFiles() to query user's files
  - Implement canAccessFile() for access control verification
  - Implement error handling for missing/inaccessible files
  - _Requirements: 2.1, 2.3, 3.2, 3.4, 6.3_

- [ ] 4.1 Write property test for access control
  - **Property 5: Access Control Enforcement**
  - **Validates: Requirements 3.1, 3.2, 3.4**
  - Test that only authorized users can retrieve files
  - Test that unauthorized users receive access denied errors

- [ ] 4.2 Write unit tests for FileRetrievalService
  - Test metadata retrieval accuracy
  - Test file list retrieval for multiple files
  - Test error handling for missing files

- [ ] 5. Implement FileManagementService
  - Create `src/services/storage/FileManagementService.ts`
  - Implement deleteFile() with ownership verification
  - Implement verifyFileOwnership() check
  - Implement metadata cleanup on deletion
  - Implement error handling for unauthorized deletion
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 5.1 Write property test for deletion consistency
  - **Property 6: Deletion Consistency**
  - **Validates: Requirements 4.2, 4.3, 6.4**
  - Test that deleted files no longer exist in Cloud Storage
  - Test that metadata is removed from Firestore

- [ ] 5.2 Write unit tests for FileManagementService
  - Test ownership verification logic
  - Test error messages for unauthorized deletion
  - Test metadata cleanup accuracy

- [ ] 6. Implement Firestore metadata storage
  - Create `src/services/storage/FirestoreMetadataService.ts`
  - Implement createMetadataDoc() to store file metadata in Firestore
  - Implement updateMetadataDoc() for metadata updates
  - Implement deleteMetadataDoc() for cleanup
  - Implement queryMetadataByUserId() for file listing
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 6.1 Write property test for metadata consistency
  - **Property 4: Metadata Consistency**
  - **Validates: Requirements 6.1, 6.2**
  - Test that Firestore metadata matches Cloud Storage file properties
  - Test that all required metadata fields are stored

- [ ] 6.2 Write property test for metadata-storage consistency
  - **Property 6.5: Consistency Invariant**
  - **Validates: Requirements 6.5**
  - Test that for every file in Cloud Storage, there's a corresponding metadata record
  - Test that metadata and files stay in sync

- [ ] 6.3 Write unit tests for FirestoreMetadataService
  - Test metadata document structure
  - Test query accuracy for user files
  - Test metadata cleanup on deletion

- [ ] 7. Implement Cloud Storage Security Rules
  - Create `storage.rules` file in project root
  - Implement authentication checks for upload/download/delete
  - Implement file type validation in rules
  - Implement file size limits in rules
  - Implement access control for user profiles
  - Deploy rules to Firebase
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 8. Implement Firestore Security Rules
  - Update `firestore.rules` file
  - Implement read/write/delete rules for files collection
  - Implement metadata validation
  - Implement access control for file metadata
  - Deploy rules to Firebase
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 9. Create FileUploadComponent (React)
  - Create `src/components/FileUploadComponent.jsx`
  - Implement file input with drag-and-drop support
  - Implement file validation feedback
  - Implement progress bar display
  - Implement error message display
  - Implement success message display
  - Wire FileUploadService for actual uploads
  - _Requirements: 1.1, 1.2, 1.5, 1.6, 5.1, 5.2, 5.5_

- [ ] 9.1 Write unit tests for FileUploadComponent
  - Test file selection and validation feedback
  - Test progress bar updates
  - Test error and success message display

- [ ] 10. Create FileDisplayComponent (React)
  - Create `src/components/FileDisplayComponent.jsx`
  - Implement image rendering with img tag
  - Implement video rendering with video tag
  - Implement audio rendering with audio tag
  - Implement metadata display (name, size, upload date)
  - Implement error handling for missing files
  - Wire FileRetrievalService for file access
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 7.5_

- [ ] 10.1 Write unit tests for FileDisplayComponent
  - Test correct HTML element rendering for each file type
  - Test metadata display accuracy
  - Test error message display for missing files

- [ ] 11. Create FileManagementComponent (React)
  - Create `src/components/FileManagementComponent.jsx`
  - Implement file list display
  - Implement delete button with confirmation
  - Implement error handling for unauthorized deletion
  - Implement success confirmation after deletion
  - Wire FileManagementService for deletion
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 11.1 Write unit tests for FileManagementComponent
  - Test file list rendering
  - Test delete confirmation dialog
  - Test success/error message display

- [ ] 12. Integrate components into StudentDashboard
  - Update `src/pages/StudentDashboard.jsx`
  - Add FileUploadComponent for profile uploads
  - Add FileDisplayComponent for viewing uploaded files
  - Add FileManagementComponent for managing files
  - Wire all services together
  - _Requirements: 1.1, 2.1, 4.1_

- [ ] 13. Integrate components into RecruiterDashboard
  - Update `src/pages/RecruiterDashboard.jsx`
  - Add FileDisplayComponent for viewing student files
  - Implement access control checks
  - Display only files user has permission to access
  - _Requirements: 2.1, 2.2, 3.2, 3.4_

- [ ] 14. Checkpoint - Ensure all tests pass
  - Run all unit tests: `npm test`
  - Run all property-based tests: `npm test -- --testNamePattern="Property"`
  - Verify no console errors or warnings
  - Ask the user if questions arise

- [ ] 15. Integration testing
  - Test complete upload flow: select file → validate → upload → display
  - Test complete retrieval flow: request file → verify access → display
  - Test complete deletion flow: select file → verify ownership → delete → confirm
  - Test access control: verify unauthorized users cannot access files
  - Test error scenarios: network failures, invalid files, missing files
  - _Requirements: 1.1, 2.1, 4.1, 3.1, 3.2_

- [ ] 16. Final checkpoint - Ensure all tests pass
  - Run full test suite: `npm test`
  - Verify all property-based tests pass with 100+ iterations
  - Verify all integration tests pass
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All services are client-side with no server code required
- Security is enforced through Firebase Security Rules
- Metadata consistency is maintained through Firestore

