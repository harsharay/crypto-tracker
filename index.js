import {AppRegistry} from 'react-native';
import App from './App';
import {name} from './app.json';
import { LogBox } from "react-native"

LogBox.ignoreAllLogs(true)

AppRegistry.registerComponent(name, () => App);