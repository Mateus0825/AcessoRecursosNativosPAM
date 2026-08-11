import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsComponent() {
  const [contacts, setContacts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        setContacts(data);
      } else {
        Alert.alert('Aviso', 'Nenhum contato foi encontrado no dispositivo.');
      }
    } else {
      Alert.alert(
        'Permissão negada',
        'É necessário conceder permissão para ler a lista de contatos.'
      );
    }
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      {item.phoneNumbers && item.phoneNumbers.length > 0 && (
        <Text style={styles.contactDetail}>
          📞 {item.phoneNumbers[0].number}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>
      <Button title="Carregar Contatos" onPress={getContacts} />

      {hasPermission === false && (
        <Text style={styles.errorText}>Acesso aos contatos negado.</Text>
      )}

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        style={styles.list}
        contentContainerStyle={contacts.length === 0 && styles.emptyContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    width: '100%',
    marginTop: 10,
  },
  contactItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  emptyContainer: {
    paddingVertical: 10,
  },
});