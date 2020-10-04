import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { TODOS } from '../utils/data.js';
const Stack = createStackNavigator();
const TodoItem = ({todo, onToggleTodo, onDeleteTodo, idx}) => {

  const statusStyle = {
    backgroundColor: todo.status === 'Done' ? 'blue' : 'green'
  };

  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => {
            console.log('deleted')
            onDeleteTodo(idx)
          }
        }
      ],
      { cancelable: true }
    );
  };

  const onHandleLongPress = todo => () => onLongPress(todo)
  const onHandleToggleTodo = id => () => onToggleTodo(id)

  return (
    <TouchableOpacity
      key={todo.body}
      style={[styles.todoItem, statusStyle]}
      onLongPress={onHandleLongPress(todo)}
      onPress={onHandleToggleTodo(todo.id)}
    >
      <Text style={styles.todoText} numberOfLines={2}>
      {idx + 1}: {todo.body}
      </Text>
    </TouchableOpacity>
  );
};

class AllScreen extends PureComponent {
  /* const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState(''); */
  state = {
    todoList: TODOS,
    todoBody: ''
  }
  onToggleTodo = id => {
    let { todoList } = this.state
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    console.log('todo', todo)
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    this.setState({ todoList: newTodoList })
    setTimeout(() => {
      this.props.navigation.navigate('Detail', {
        updatedTodo: todo
      });
    }, 500);
  };

  onDeleteTodo = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id)
    }))
  };

  onSubmitTodo = () => {
    let { todoList, todoBody } = this.state
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    console.log('new todo list: ---', newTodoList)
    this.setState({ todoList: newTodoList, todoBody: '' })

  };

  todoItem = (todo, idx) => (<TodoItem
    idx={idx}
    todo={todo}
    key={todo.body}
    onToggleTodo={this.onToggleTodo}
    onDeleteTodo={this.onDeleteTodo}
  />)

  render() {
    const {todoList} = this.state
    return (
      <ImageBackground style={styles.container} source={require('../assets/1.jpg')}>
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={styles.keyboard}
        >
          <ScrollView style={{ flex: 1 }}>
            <View>
              {todoList.map(this.todoItem)}
              <View style={styles.inputContainer}>
                <TextInput
                  value={this.state.todoBody}
                  style={styles.todoInput}
                  onChangeText={text => this.setState({todoBody: text})} />
                <TouchableOpacity style={styles.button} onPress={this.onSubmitTodo}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}
const SingleTodoScreen =({ route }) => {
  return (
    <View style={styles.container1}>
      <Text style={styles.headerText}>
        {route.params.updatedTodo?.id}. {route.params.updatedTodo?.status}
      </Text>
      <Text style={styles.bodyText}>{route.params.updatedTodo?.body}</Text>
    </View>
  );
};

SingleTodoScreen.navigationOptions = {
  title: 'SingleTodoScreen'
};
AllScreen.navigationOptions = {
  title: 'All Todos'
};
export default function AllStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="All" component={AllScreen}/>
      <Stack.Screen name="Detail" component={SingleTodoScreen}/>
    </Stack.Navigator>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: '95%',
    color: 'white',
    borderRadius: 10,
    flexWrap: 'wrap'
  },
  todoText: {
    width:"85%",
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width:"95%",
    height:50,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '98%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
    paddingTop: 1000
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  headerContainer: {
    flexDirection: 'row'
  },
  headerText: {
    fontSize: 30
  },
  bodyText: {
    fontSize: 50
  }
});