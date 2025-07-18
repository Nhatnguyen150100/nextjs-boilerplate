import React from 'react';
import { Button } from '../ui';
import { BaseModal } from './BaseModal';

interface IProps {
  open: boolean;
  title: string;
  onAccept: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function BaseConfirmModal({
  open,
  title,
  onAccept,
  onCancel,
  children,
  isLoading = false,
}: IProps) {
  const footerButtons = (
    <div className="grid grid-cols-2 sm:gap-[10px] gap-2 w-full">
      <Button
        variant="noBorder"
        onClick={onCancel}
        className="sm:text-base text-xs font-medium sm:py-[13px] py-2"
      >
        Hủy
      </Button>
      <Button
        className="sm:text-base text-xs font-medium text-white sm:py-[13px] py-2"
        onClick={onAccept}
        isLoading={isLoading}
      >
        Xác nhận
      </Button>
    </div>
  );

  return (
    <BaseModal
      open={open}
      onOpenChange={onCancel}
      title={title}
      footer={footerButtons}
    >
      {children}
    </BaseModal>
  );
}
