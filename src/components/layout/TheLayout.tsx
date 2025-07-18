import React from 'react';
import { BaseCustomContainer } from '../base/BaseCustomContainer';
import TheFooter from './TheFooter';
import TheHeader from './TheHeader';

export default function TheLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TheHeader />
      <main className="min-h-screen">
        <div className="mt-16 w-full">
          <BaseCustomContainer className="flex flex-col row-start-2 items-center">
            {children}
          </BaseCustomContainer>
        </div>
      </main>
      <TheFooter />
    </>
  );
}
