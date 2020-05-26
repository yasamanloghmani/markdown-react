import React, { Component } from "react";
import AceEditor from "react-ace";
import MarkdownView from "react-showdown";
import themes from "./utils/EditorThemes";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import './App.css';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './utils/theme';
import { GlobalStyles } from './utils/global';
import ReactToPdf from "react-to-pdf";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon} from '@fortawesome/free-solid-svg-icons';
import { faSun} from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie';
import animationData from './lf30_editor_kDMQ53.json';




export default class App extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      markdown: `## :heart: Hello, I'm a REACT-Markdown Editor.
### 

Bonus points:

- Live preview
- Selectable themes for input area
- Dark Mood and Light Mood
- Print to PDF
- Locally installed (using Electron, for example)
- Responsive design
`,
      theme: "github"
    };
  }

  updateEditorTheme(selectedTheme) {
    this.setState({
      theme: selectedTheme
    });
  }


  toggleTheme = () => {
    if (this.state.theme === 'light') {
      this.setState({theme : 'dark'});
    } else {
      this.setState({theme : 'light'});
    }
  }
  defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  render() {
    const { markdown, theme } = this.state;
    const themeOptions = themes.map((theme, i) => (
      <option className="theme-option" key={i}>
        {theme}
      </option>
    ));

    return (
      <div className="App">
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <h1 className="title">Markdown Editor</h1>
        <GlobalStyles />
        <div className="hi">
        <Lottie options={this.defaultOptions}
              height={230}
              width={480}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}
              className="hi"
        />
        </div>
        
        <div className="container">
          <div className="theme">
            <div className="theme-selector">
              <label>Select Editor Theme: </label>
              <select
                name="theme-names"
                id="theme-names"
                aria-label="Select a theme for your editor"
                aria-required="false"
                onChange={e => this.updateEditorTheme(e.target.value)}
              >
                {themeOptions}
              </select>
            </div>
            <AceEditor
              className="editor box-size"
              mode="markdown"
              theme={theme}
              onChange={(value, stat) => {
                this.setState({
                  markdown: value
                });
                console.log("onChange", value, stat);
              }}
              highlightActiveLine={true}
              wrapEnabled={true}
              fontSize={14}
              value={markdown}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <div>
          
          <div className= {this.state.theme === 'light' ? 'Menu-link moodLight'  : 'Menu-link moodDark'} onClick={this.toggleTheme}>
            {this.state.theme === 'light' ?  <FontAwesomeIcon icon={ faSun } className='icons' /> :<FontAwesomeIcon icon={ faMoon } className='icons' /> }
            <p>{this.state.theme === 'light' ? 'Light Mood'  : 'Dark Mood'} </p>
          </div>
          
          <MarkdownView ref={this.ref}
            className="view box-size"
            markdown={markdown}
            options={{
              strikethrough: true,
              underline: true,
              tables: true,
              emoji: true
            }}
          />
        <ReactToPdf>
          {({toPdf, targetRef}) =>  (
            <button  onClick={toPdf} ref={targetRef}>PDF</button>
          )}
        </ReactToPdf>
          </div>
          
        </div>
        </ThemeProvider>
      </div>
    );
  }
}
