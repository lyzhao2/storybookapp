import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

type StoryPage = {
  id: number;
  image: string;
  caption: string;
  audio: string;
}

const App = () => {
  const [pages, setPages] = useState<StoryPage[]>([
    {
      id: 1,
      image: "img",
      caption: "caption",
      audio: "audio"
    },
    {
      id: 1,
      image: "img",
      caption: "caption",
      audio: "audio"
    },
    {
      id: 1,
      image: "img",
      caption: "caption",
      audio: "audio"
    }
  ]);

  const [llm_choice, setLLM] = useState("");
  const [dalle_choice, setDALLE] = useState("");
  const [story, setStory] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("llm: ", llm_choice);
    console.log("dalle: ", dalle_choice);
    console.log("story: ", story);

    try {
      const response = await fetch(
        "http://localhost:5000/api/storybook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            llm_choice,
            dalle_choice,
            story
          }),
        }
      );
      const newNote = await response.json();

    } catch (e) {
      console.log("ERROR! ", e)
    }
  }
  
  return (
    <div className="app-container">
        <div className="submission-area">
          <h1>Create your storybook now!</h1>
          <form
          className = "submission-form"
          onSubmit={(event) => handleSubmit(event)}
          >
            <label>Which GTP LLM model would you like to use?</label>
            <input
            value={llm_choice}
            onChange={(event) =>
              setLLM(event.target.value)
            }
            placeholder = "GPT-4" 
            required
            ></input>
            <label>Which Dall E model would you like to use?</label>
            <input
            value={dalle_choice}
            onChange={(event) =>
              setDALLE(event.target.value)
            }
            placeholder = "DALL-E 3" 
            required
            ></input>
            <label>What would you like your story to be about?</label>
            <textarea
            value={story}
            onChange={(event) =>
              setStory(event.target.value)
            }
            placeholder="Give me a story about a princess in a far away land."
            rows = {10} 
            required
            ></textarea>
            <button type="submit">Generate your story</button>
          </form>
        </div>
        <div className="story-area">
          <h2>Here's your generated story!</h2>
          {pages.map((page) => (
            <div className="story-page">
              <h2>{page.image}</h2>
              <p>{page.caption}</p>
              <p>{page.audio}</p>
            </div>
          ))}
          
        </div>
    </div>
  );
}

export default App;
