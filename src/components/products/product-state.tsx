import { Text, View } from 'react-native';

const STATE_NEW = 'totaly_new';
const STATE_USED = 'used';

type StateType = 'totaly_new' | 'used' | 'restored';

const STATE_MAP: Record<StateType, { label: string; bgClass: string }> = {
  [STATE_NEW]: { label: 'New', bgClass: 'bg-blue-700' },
  [STATE_USED]: { label: 'Used', bgClass: 'bg-green-700' },
  restored: { label: 'Restored', bgClass: 'bg-gray-700' },
};

export function ProductState({ state }: { state: string }) {
  const { label, bgClass } =
    STATE_MAP[state as StateType] || STATE_MAP.restored;

  return (
    <View
      className={`flex items-center justify-center rounded-[4px] ${bgClass}`}
    >
      <Text className="self-center px-3 py-1 text-[14px] font-bold color-white">
        {label}
      </Text>
    </View>
  );
}
