import { useState } from "react";
import { Image, StyleSheet, Text,TouchableOpacity,View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { type Product,useAddFav } from "@/api/products/use-products";
import { black } from "@/ui/colors";
const MAX_TEXT_LENGTH = 12;

function truncateText (text: string, maxLength: number): string { 
  const result = (text.replace(/\s+/g, " ").length > maxLength 
    ? `${text.replace(/\s+/g, " ").substring(0, maxLength)}...` 
    : text.replace(/\s+/g, " "));
  return result;
}

export function ProductItem({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(product.is_favorite);
  const { mutate: addToFavorites } = useAddFav();

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    addToFavorites(product.id);
  };

  return (
    <View key={product.id} style={styles.cardContainer}  className="m-r-4">
    <Image source={{ uri: product.pictures[0] }} style={styles.image} />
    <View style={{ height: 1, width:'100%', backgroundColor:black }} />
    
    <View style={styles.descriptionContainer}>
      <View style={styles.descriptionRow}>
        <Text style={styles.text}>{product.unit_price}</Text>
        <ProductState state={product.state.toString()}></ProductState>
      </View>

      <View style={styles.descriptionRow}>
        <Text style={styles.text}> {truncateText(product.title, MAX_TEXT_LENGTH)}</Text>
        <TouchableOpacity onPress= {toggleFavorite} >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"} // Filled if favorite, outline otherwise
              size={20}
              color={isFavorite ? "red" : "gray"}
                  />
        </TouchableOpacity>      
      </View>
    </View>
  </View>
  );
}

function ProductState({ state }: { state: string }) {
  return (
   state==='totaly_new'? 
   <View style={styles.stateContainerBlue}>
      <Text style={styles.stateBlueText}>New</Text>
    </View> : <View style={styles.stateContainerGreen}>
        <Text style={styles.stateGreenText}>Restored</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    width: 170,
    height:230,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: 'white',
    marginLeft: 8,
    marginRight: 4,
    marginBottom: 8,

    // iOS Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: 'black',
  },
  descriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex:1,
    padding: 8,
  },
  descriptionRow:{ 
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  text: {
    color: black,
    fontSize: 16,
    fontWeight: 'bold',
    flex:1,
  },
  image:{ width: '100%', height: 150, borderRadius:8, },
  stateBlueText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  stateGreenText: {
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