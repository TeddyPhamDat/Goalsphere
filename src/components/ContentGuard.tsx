/**
 * ContentGuard - Wrapper component for AdSlot to ensure AdSense policy compliance
 * 
 * This component prevents ads from showing on:
 * - Pages with no content or low-value content
 * - Error pages
 * - Loading states
 * - Pages under construction
 * 
 * Usage:
 * <ContentGuard hasContent={!!article}>
 *   <AdSlot size="728x90" />
 * </ContentGuard>
 */

import { ReactNode } from "react";

interface ContentGuardProps {
  /** Whether the page has valid content loaded */
  hasContent: boolean;
  /** Content to protect (usually AdSlot component) */
  children: ReactNode;
  /** Optional fallback to show when content is not available */
  fallback?: ReactNode;
}

export default function ContentGuard({ 
  hasContent, 
  children, 
  fallback = null 
}: ContentGuardProps) {
  // Only render ads if we have actual content
  // This ensures compliance with Google AdSense policies
  if (!hasContent) {
    return fallback;
  }

  return <>{children}</>;
}
