import { ElementType, ReactNode } from 'react';
import styles from './ButtonCell.module.css';

import { classNames } from 'helpers/classNames';
import { hasReactNode } from 'helpers/react';
import { usePlatform } from 'hooks/usePlatform';

import { Tappable, TappableProps } from 'components/Service/Tappable/Tappable';
import { Subheadline } from 'components/Typography/Subheadline/Subheadline';
import { Text } from 'components/Typography/Text/Text';

interface ButtonCellProps extends Omit<TappableProps, 'Component'> {
  type?: 'default' | 'destructive';
  before?: ReactNode;
  after?: ReactNode;
  Component?: ElementType;
}

export const ButtonCell = ({
  type = 'default',
  before,
  after,
  className,
  children,
  Component,
  ...restProps
}: ButtonCellProps) => {
  const platform = usePlatform();
  const Typography = platform === 'ios' ? Subheadline : Text;

  return (
    <Tappable
      Component={Component || 'button'}
      className={classNames(
        styles.wrapper,
        type === 'destructive' && styles['wrapper--destructive'],
        platform === 'ios' && styles['wrapper--ios'],
        className,
      )}
      {...restProps}
    >
      {hasReactNode(before) && before}
      {hasReactNode(children) && <Typography>{children}</Typography>}
      {hasReactNode(after) && after}
    </Tappable>
  );
};
