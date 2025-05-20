import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ name, price, image, onPress, style }) => (
  <TouchableOpacity style={[styles.productCard, style]} onPress={onPress}>
    <Image source={image} resizeMode="stretch" style={styles.productImage} />
    <Image source={require('../assets/traitim.png')} resizeMode="stretch" style={styles.heartIcon} />
    <Text style={styles.productName}>{name}</Text>
    <View style={styles.priceContainer}>
      <View style={styles.priceRow}>
        <Image source={require('../assets/iconchuN1.png')} resizeMode="stretch" style={styles.priceIcon} />
        <Text style={styles.priceText}>{price}</Text>
      </View>
      <Image source={require('../assets/iconcong.png')} resizeMode="stretch" style={styles.addIcon} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  productCard: {
    width: 150,
    backgroundColor: '#FFF5E6',
    borderRadius: 12,
    marginBottom: 16,
    padding: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  heartIcon: {
    width: 16,
    height: 14,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  productName: {
    color: '#27214D',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceIcon: {
    width: 16,
    height: 12,
    marginRight: 4,
  },
  priceText: {
    color: '#F08626',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default ProductCard;
