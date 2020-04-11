import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      console.log(projects);
      setProjects(response.data);
    });
  }, []);
  async function HandleAddProject() {
    const response = await api.post('projects',{
        title: `Novo ${Date.now()}`,
        owner: 'Fabricio Moreia'
    });

    const project = response.data;

    setProjects([...projects, project]);

  }

  return (
    <>
      <StatusBar barStyle="ligth-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects} //obrigatorio ser um array
          keyExtractor={(p) => p.id}
          renderItem={(
            { item } // pode colocar renderItem={({item: p}) -> renomeia  nome da variavel item
          ) => <Text style={styles.project}>{item.title}</Text>}
        />
        {/* <View style={styles.container}>
        {projects.map(p => (
            <Text style={styles.project} key={p.id}>{p.title}</Text>
        ))}
      </View> */}
      <TouchableOpacity 
      activeOpacity={0.6} 
      style={styles.button}
      onPress={HandleAddProject}
      >
        <Text style={styles.buttonText}>Add projeto</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  project: {
    fontSize: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
