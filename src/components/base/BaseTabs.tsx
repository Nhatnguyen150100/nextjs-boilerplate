'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TTabItem } from '@/types/tab';
import * as React from 'react';
import Visibility from './visibility';

interface IProps {
  defaultValue?: string;
  items: TTabItem[];
  className?: string;
  tabListClassName?: string;
  tabTriggerClassName?: string;
  onValueChange?: (value: string) => void;
  controlledValue?: string;
}

export default function BaseTabs({
  defaultValue,
  controlledValue,
  onValueChange,
  items,
  className = '',
  tabListClassName = '',
  tabTriggerClassName = '',
}: IProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? items[0]?.value ?? '',
  );

  const value = controlledValue ?? internalValue;

  const handleValueChange = (newValue: string) => {
    if (!controlledValue) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <Tabs value={value} onValueChange={handleValueChange} className={className}>
      <TabsList className={`w-full flex gap-3 ${tabListClassName}`}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={`flex-1 text-center sm:text-base text-sm ${tabTriggerClassName}`}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <Visibility visibility={items.some((item) => item.content)}>
        {items.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </Visibility>
    </Tabs>
  );
}
