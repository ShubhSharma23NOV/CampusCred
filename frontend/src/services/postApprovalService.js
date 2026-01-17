import { recruiterPostsService, POST_STATUS } from "./recruiterPostsService";

/**
 * Post Approval Service
 * Handles Admin/TPO side operations for approving/rejecting recruiter posts.
 */

export const postApprovalService = {
    // List posts by status
    listPostsByStatus: (status) => {
        const posts = recruiterPostsService.listPosts();
        if (status === 'ALL') return posts;
        return posts.filter(p => p.status === status);
    },

    // Get counts for Admin KPI
    getApprovalStats: () => {
        const posts = recruiterPostsService.listPosts();
        return {
            pending: posts.filter(p => p.status === POST_STATUS.PENDING).length,
            approvedToday: posts.filter(p => p.status === POST_STATUS.APPROVED && p.approvedAt?.startsWith(new Date().toISOString().split('T')[0])).length,
            rejectedToday: posts.filter(p => p.status === POST_STATUS.REJECTED && p.rejectedAt?.startsWith(new Date().toISOString().split('T')[0])).length,
        };
    },

    // Approve a post
    approvePost: (postId, adminId = 'ADMIN_1') => {
        const posts = recruiterPostsService.listPosts();
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
            const auditEntry = {
                action: 'APPROVED',
                actor: adminId,
                timestamp: new Date().toISOString(),
                note: 'Post approved by TPO'
            };

            const updates = {
                status: POST_STATUS.APPROVED,
                approvedByAdminId: adminId,
                approvedAt: new Date().toISOString(),
                audit: [...(posts[index].audit || []), auditEntry]
            };

            return recruiterPostsService.updatePost(postId, updates);
        }
        return null;
    },

    // Reject a post
    rejectPost: (postId, reason, adminId = 'ADMIN_1') => {
        const posts = recruiterPostsService.listPosts();
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
            const auditEntry = {
                action: 'REJECTED',
                actor: adminId,
                timestamp: new Date().toISOString(),
                reason: reason
            };

            const updates = {
                status: POST_STATUS.REJECTED,
                rejectionReason: reason,
                rejectedByAdminId: adminId,
                rejectedAt: new Date().toISOString(),
                audit: [...(posts[index].audit || []), auditEntry]
            };

            return recruiterPostsService.updatePost(postId, updates);
        }
        return null;
    },

    // Request changes
    requestChanges: (postId, reason, adminId = 'ADMIN_1') => {
        const posts = recruiterPostsService.listPosts();
        const index = posts.findIndex(p => p.id === postId);
        if (index !== -1) {
            const auditEntry = {
                action: 'NEEDS_CHANGES',
                actor: adminId,
                timestamp: new Date().toISOString(),
                reason: reason
            };

            const updates = {
                status: POST_STATUS.DRAFT, // Back to draft
                rejectionReason: `TPO Feedback: ${reason}`,
                audit: [...(posts[index].audit || []), auditEntry]
            };

            return recruiterPostsService.updatePost(postId, updates);
        }
        return null;
    }
};
