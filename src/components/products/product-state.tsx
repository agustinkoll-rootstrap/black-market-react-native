import { StyleSheet, Text,View } from "react-native";

const STATE_NEW = 'totaly_new';

export function ProductState({ state }: { state: string }) {
  return (
   state === STATE_NEW? 
   <View style={styles.stateContainerBlue}>
      <Text style={styles.text}>New</Text>
    </View> : <View style={styles.stateContainerGreen}>
        <Text style={styles.text}>Restored</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  stateContainerBlue: {
    display: 'flex',
    backgroundColor: 'blue',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateContainerGreen: { 
    display: 'flex',
    backgroundColor: 'green',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});