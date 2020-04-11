import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      
      setRepositories(response.data);
    });
  }, [repositories]);

  async function HandleAddRepository() {
    const response = await api.post("repositories", {
      title: "Titulo Novo",
      url: "URL Nova",
      techs: "TECH Nova",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function HandleAddLike(item) {    
    await api.post('repositories/'+item.id+'/like', {
      title: item.title,
      url: item.url,
      techs: item.techs,
    });
  }

  return (
    <>
      <StatusBar barStyle="ligth-content" backgroundColor="#2E8B57" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(r) => r.id}
          renderItem={(
            { item } // pode colocar renderItem={({item: p}) -> renomeia  nome da variavel item
          ) => (
            <>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={styles.project}>{item.title} </Text>
              </View>
               <View>
                <Text style={styles.project}>Possui {item.likes} Curtida(s) </Text>
              </View>
              <View style={styles.buttonLike}>
                <Button
                  onPress={() => HandleAddLike(item)}
                  title=" 👍"
                  color="#2E8B57"
                />
              </View>
            </View>
            </>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={HandleAddRepository}
        >
          <Text style={styles.buttonText}>Add Repositório</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E8B57",
  },
  project: {
    fontSize: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonLike: {
     width: 40,
     height: 50,
  },
});
