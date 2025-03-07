/**
 * Modal
 * Dependencies:
 * - @gorhom/bottom-sheet.
 *
 * Props:
 * - All `BottomSheetModalProps` props.
 * - `title` (string | undefined): Optional title for the modal header.
 *
 * Usage Example:
 * import { Modal, useModal } from '@gorhom/bottom-sheet';
 *
 * function DisplayModal() {
 *   const { ref, present, dismiss } = useModal();
 *
 *   return (
 *     <View>
 *       <Modal
 *         snapPoints={['60%']} // optional
 *         title="Modal Title"
 *         ref={ref}
 *       >
 *         Modal Content
 *       </Modal>
 *     </View>
 *   );
 * }
 *
 */

import type {
  BottomSheetBackdropProps,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetModal, useBottomSheet } from '@gorhom/bottom-sheet';
import type { ForwardedRef } from 'react';
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

import { Text } from './text';

type ModalProps = BottomSheetModalProps & {
  title?: string;
};

type ModalRef = ForwardedRef<BottomSheetModal>;

type ModalHeaderProps = {
  title?: string;
  dismiss: () => void;
};

export const useModal = () => {
  const ref = useRef<BottomSheetModal>(null);
  const present = useCallback((data?: unknown) => {
    ref.current?.present(data);
  }, []);
  const dismiss = useCallback(() => {
    ref.current?.dismiss();
  }, []);
  return { ref, present, dismiss };
};

export const Modal = forwardRef(
  (
    {
      snapPoints: _snapPoints = ['60%'],
      title,
      detached = false,
      ...props
    }: ModalProps,
    ref: ModalRef,
  ) => {
    const detachedProps = useMemo(() => getDetachedProps(detached), [detached]);
    const modal = useModal();
    const snapPoints = useMemo(() => _snapPoints, [_snapPoints]);

    useImperativeHandle(
      ref,
      () => (modal.ref.current as BottomSheetModal) || null,
    );

    const renderHandleComponent = useCallback(
      () => (
        <>
          <View className="mb-8 mt-2 h-1 w-12 self-center rounded-lg bg-gray-400 dark:bg-gray-700" />
          <ModalHeader title={title} dismiss={modal.dismiss} />
        </>
      ),
      [title, modal.dismiss],
    );

    return (
      <BottomSheetModal
        {...props}
        {...detachedProps}
        ref={modal.ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={props.backdropComponent ?? renderBackdrop}
        handleComponent={renderHandleComponent}
      />
    );
  },
);

/**
 * Custom Backdrop
 */

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
  const { close } = useBottomSheet();
  const FADE_IN_DURATION = 50;
  const FADE_OUT_DURATION = 20;
  return (
    <AnimatedPressable
      onPress={() => close()}
      entering={FadeIn.duration(FADE_IN_DURATION)}
      exiting={FadeOut.duration(FADE_OUT_DURATION)}
      style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]}
    />
  );
};

export const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <CustomBackdrop {...props} />
);

/**
 *
 * @param detached
 * @returns
 *
 * @description
 * In case the modal is detached, we need to add some extra props to the modal to make it look like a detached modal.
 */

const getDetachedProps = (detached: boolean) => {
  if (detached) {
    return {
      detached: true,
      bottomInset: 46,
      style: { marginHorizontal: 16, overflow: 'hidden' },
    } as Partial<BottomSheetModalProps>;
  }
  return {} as Partial<BottomSheetModalProps>;
};

/**
 * ModalHeader
 */

const ModalHeader = memo(({ title, dismiss }: ModalHeaderProps) => (
  <>
    {title && (
      <View className="flex-row px-2 py-4">
        <View className="h-[24px] w-[24px]" />
        <View className="flex-1">
          <Text className="text-center text-[16px] font-bold text-[#26313D] dark:text-white">
            {title}
          </Text>
        </View>
      </View>
    )}
    <CloseButton close={dismiss} />
  </>
));

const CloseButton = ({ close }: { close: () => void }) => (
  <Pressable
    onPress={close}
    className="absolute right-3 top-3 h-[24px] w-[24px] items-center justify-center "
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    accessibilityLabel="close modal"
    accessibilityRole="button"
    accessibilityHint="closes the modal"
  >
    <Svg
      className="fill-neutral-300 dark:fill-white"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <Path d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293Z" />
    </Svg>
  </Pressable>
);
