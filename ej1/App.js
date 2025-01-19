import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [imageSelected, setImageSelected] = useState(null);

  const abrirArchivosAsync = async () => {
    try {
      const resultadoSeleccion = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (resultadoSeleccion.canceled) {
        return;
      }

      setImageSelected({
        direccion: resultadoSeleccion.assets[0].uri,
      });
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al seleccionar la imagen.');
      console.error(error);
    }
  };

  const abrirCompartirArchivosAsync = async () => {
    if (!imageSelected) return;

    try {
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Error', 'Esta imagen no se puede compartir en tu dispositivo.');
        return;
      }

      await Sharing.shareAsync(imageSelected.direccion);
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al compartir la imagen.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={{
          uri: imageSelected ? imageSelected.direccion : 'https://www.univalle.edu/wp-content/uploads/2022/06/logo_uni01.png',
        }}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Hola Univalle</Text>
      <Text style={styles.subtitulo}>Bienvenidos al módulo 4</Text>

      <Pressable style={styles.boton} onPress={abrirArchivosAsync}>
        <Text style={styles.textoBoton}>¡Cambiar imagen!</Text>
      </Pressable>

      {imageSelected && (
        <Pressable style={styles.boton} onPress={abrirCompartirArchivosAsync}>
          <Text style={styles.textoBoton}>Compartir imagen</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 50,
    color: 'black',
  },
  subtitulo: {
    alignSelf: 'center',
    fontSize: 16,
  },
  logo: {
    height: 200,
    width: 200,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  boton: {
    backgroundColor: '#2510ABFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  textoBoton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
