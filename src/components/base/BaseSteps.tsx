import { cn } from '@/lib/utils';
import React from 'react';

export type StepItem = {
  title: string;
  step: number;
};

interface IProps {
  steps: StepItem[];
  currentStep: number;
}

export default function BaseSteps({ steps, currentStep }: IProps) {
  return (
    <div className="flex items-start justify-between w-full">
      {steps.map((step, index) => {
        const isCompleted = step.step < currentStep;
        const isCurrent = step.step === currentStep;

        return (
          <div key={step.step} className="flex items-center flex-1">
            <div
              className={cn(
                'flex flex-col items-center text-center relative w-full',
              )}
            >
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    'absolute -right-1/2 w-full h-[2px] top-3 z-0',
                    isCompleted ? 'bg-primary' : 'bg-gray-300',
                  )}
                />
              )}

              <div
                className={cn(
                  'w-7 h-7 rounded-full border text-xs flex items-center justify-center z-10 relative',
                  isCompleted && 'bg-primary text-white border-primary',
                  isCurrent &&
                    'bg-primary-foreground border-primary text-primary',
                  !isCompleted &&
                    !isCurrent &&
                    'bg-white border-gray-300 text-gray-400',
                )}
              >
                {isCompleted ? '✔' : step.step}
              </div>

              <div
                className={cn(
                  'mt-1 whitespace-pre-wrap overflow-x-hidden px-1 font-medium sm:text-base text-sm max-w-[60px]',
                  isCompleted ? 'text-primary' : 'text-label-footer-auth ',
                )}
              >
                {step.title}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
