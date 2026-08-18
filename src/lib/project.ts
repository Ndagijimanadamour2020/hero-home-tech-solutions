export function projectPrice(project: any): string {
  if (!project) return 'Contact for Quote';
  if (project.price && project.price > 0) {
    const currency = project.currency || 'USD';
    return currency === 'USD'
      ? `$${project.price.toLocaleString()}`
      : `${currency} ${project.price.toLocaleString()}`;
  }
  if (project.projectPrice) {
    return project.projectPrice;
  }
  return 'Contact for Pricing';
}

export function safeUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}