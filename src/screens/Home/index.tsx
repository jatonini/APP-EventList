import { Text, View, TextInput, TouchableOpacity, Button, Image, ScrollView, FlatList, Alert } from 'react-native';
import { styles } from './styles'
import { Participant } from '../../components/Participant';
import { useState } from 'react'; 

export default function Home() {

    //Array de participantes
    const [participants, setParticipants] = useState<string[]>([]);
    //Input de particpante
    const [participantName, setParticipantName] = useState('');
    //array de eventos
    const [events, setEvents] = useState<string[]>([]);
    //input do evento
    const [eventName, setEventName] = useState('')

    function handleParticipantAdd() {
        if (participants.includes(participantName)){
            return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
        }

        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('')
    }

    function handleParticipantRemove(name: string) {

        Alert.alert("Remover", `Remover o participante ${ name } ?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participants => participants !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    function dataPorExtensoCurta() {
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const mesesAno = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
      
        const data = new Date();
        const diaSemana = diasSemana[data.getDay()];
        const dia = data.getDate();
        const mes = mesesAno[data.getMonth()];
        const ano = data.getFullYear()
      
        return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
    }

    function handleEventAdd() {
        if (!eventName) return

        setEvents(prevEvents => [...prevEvents, eventName]);
        setEventName('')
    }

    return (

        <View style={styles.container}>

            <View style={styles.formEvent}>

                <TextInput
                    style={styles.inputEvent}
                    placeholder='Digite o nome do evento'
                    placeholderTextColor='#6B6B6B'
                    onChangeText={text => setEventName(text)} 
                    value={eventName}
                />
    
                <TouchableOpacity style={styles.button} onPress={handleEventAdd}>
                    <Text style={styles.buttonTextEvent}>
                        +
                    </Text>
                </TouchableOpacity>
        
            </View>

            <Text style={styles.eventName}>
                {events.length > 0 ? events[events.length - 1] : 'Dê um nome para seu evento!'} 
            </Text>

            <Text style={styles.eventDate}>
                {dataPorExtensoCurta()}.
            </Text>

            <View style={styles.form}>

                <TextInput
                    style={styles.input}
                    placeholder='Nome do Participante'
                    placeholderTextColor='#6B6B6B'
                    onChangeText={text => { const formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
                                setParticipantName(formattedText)}}
                    value={participantName}
                />
                
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>

                    <Text style={styles.buttonText}>
                        +
                    </Text>

                </TouchableOpacity>

            </View>

            <FlatList 
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant 
                            key={item}
                            name={item} 
                            onRemove={() => handleParticipantRemove(item)}
                    />
                )}  
                showsVerticalScrollIndicator={false}  
                ListEmptyComponent={() => (

                    <Text style={styles.listEmptyText}>
                        Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença 
                    </Text>
                )}        
            />
    
        </View>

    )
}