export declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: any) => string;
      reset: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: string;
      email: string;
      name?: string;
    };
  }
}
