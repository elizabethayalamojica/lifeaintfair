const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    // -1 symbolizes you lost and it will restart the game. you could make a function that endsGame() and make it go to the life summary
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}
// things within each array
// id (age), text(scenario), options(array of decisions)
// to add: images, objects for each quiz, variable for number of strikes!!!!! maybe that can replace the -1
// {
// text: '',
// options: [{text: }, setState: {}, nextText: ]}, {text: }, setState: {}, nextText: ]}],

// things within each option: text (decision), setState (useAI boolean), nextText: next scenario, 
// maybe an array that collects life achievents ??? later.

// logic
// if bad AI consequence: 

const textNodes = [
  {
    id: 1,
    text: 'Age 0 : Happy Birthday! \n \n Welcome to the world, baby! You’re still at the hospital getting checked out. The doctors want to make sure you’re all right, so they are using brand new technology powered by Artificial Intelligence to detect genetic disorders. While it’s not perfect, it could help test diseases for faster treatment.',
    options: [
      {
        text: 'Use AI tools at the hospital to help detect diseases and defects in your health.',
        setState: { blueGoo: true },
        nextText: 101
      },
      {
        text: 'Opt out and stick to traditional methods to make sure your are a healthy baby.',
        nextText: 104
      }
    ]
  },

  { // good AI consequence
    id: 101,
    text: 'The AI successfully identified a potential genetic disorder early on, allowing for immediate medical attention. This timely detection enabled healthcare professionals to promptly initiate specialized treatment, ensuring that necessary care was provided swiftly. Thanks to the AI\'s early detection, the treatment process began promptly, facilitating a more proactive approach towards managing the condition effectively. \n \n Quiz: How did AI help us here?',
    options: [
        {
            text: 'By providing emotional support during the treatment process.',
            setState: {blueGoo: true},
            nextText: 103
        },
        {
            text: 'By facilitating a proactive approach to managing the condition through early detection.',
            setState: {blueGoo: true},
            nextText: 102
        },
        {
            text: 'By offering financial assistance for medical expenses.',
            setState: {blueGoo: true},
            nextText: 103
        },
        {
            text: 'By enhancing communication between healthcare professionals and the patient.',
            setState: {blueGoo: true},
            nextText: 103
        }
    ]
  },

  {
    id: 104,
    text: 'Opting not to use AI for genetic disorder detection, the doctors rely on traditional testing methods and thorough examinations. With meticulous care, they conduct comprehensive screenings, physical assessments, and genetic tests, ensuring a thorough evaluation of your health. This decision fosters a sense of confidence in the reliability of conventional medical practices, and your baby is given a clean bill of health. The traditional approach provides reassurance to the family, establishing a strong foundation for a healthy and happy start to your life. \n \n How could AI have impacted this scenario?',
    options: [
      {
        text: ' Employing AI to analyze your astrological chart could have provided insights into potential health risks and personalized care strategies.',
        setState: {},
        nextText: 103   
      },
      {
        text: 'Integrating AI to generate a virtual baby companion could have offered emotional support to you and family during the hospital stay.',
        setState: {},
        nextText: 103  
      },
      {
        text: 'Utilizing AI to create a digital scrapbook of you first moments could have enhanced the family\'s memories without impacting the medical evaluation.',
        setState: {},
        nextText:   103    
      },
      {
        text: 'Implementing AI for genetic disorder detection would have enabled quicker and more accurate diagnoses, leading to faster treatment options and personalized care.',
        setState: {},
        nextText: 102      
      }
    ]
  },

  { // correct answer positive AI consequence
    id: 102,
    text:'Correct! You advance 2 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 4,
        }
    ]
  },
  { // incorrect answer positive AI consequence
    id: 103,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 2
        }
    ]
  },

  {
    id: 2,
    text: 'Your parents are navigating the challenges of parenting, especially when it comes to your sleep patterns. One day, they come across a trendy AI-powered baby sleep tracker called "DreamWatch," which promises to provide insights into your sleep habits and offer recommendations for better sleep quality.',
    options: [
        {
            text: 'Use AI',
            nextText: 201
        },
        {
            text: 'Don\'t use AI',
            nextText: 201
        }
    ]
  },

  {
    id: 201,
    text: 'In the subsequent weeks, a tangible improvement in your sleep quality became evident. The systematic approach facilitated by "DreamWatch" contributed significantly to a more consistent and effective bedtime routine. The AI\'s insights, tailored to your specific needs, played a pivotal role in fostering longer and more rejuvenating sleep periods. \n \n Quiz: How did AI help us here?',
    options: [
        {
            text: 'By introducing a futuristic bedtime routine with \'DreamWatch\' that, unfortunately, didn\'t yield any significant changes.',
            nextText: 203
        },
        {
            text: 'By relying on random AI-generated recommendations from \'DreamWatch,\' hoping for a miracle improvement in sleep quality.',
            nextText: 203
        },
        {
            text: 'Through trial and error with multiple AI-powered apps, with little success in improving our baby\'s sleep patterns.',
            nextText: 203
        },
        {
            text: 'By utilizing \'DreamWatch\' to analyze and enhance sleep patterns, resulting in a tangible improvement in overall sleep quality.',
            nextText: 202
        }

    ]
  },

  {
    id: 204,
    text: 'Opting not to use the AI-powered baby sleep tracker, your parents find themselves grappling with the challenges of deciphering your sleep patterns without the automated insights provided by the technology. Despite maintaining a consistent bedtime routine and seeking advice from pediatricians, the absence of AI-generated recommendations leaves them with a less precise understanding of your sleep needs, potentially leading to more trial-and-error approaches and prolonged sleep disturbances. This affects your development. \n \n How could AI have impacted this scenario?',
    options: [
      {
        text: 'Your parents might have considered using AI to generate a virtual dream interpreter, providing whimsical explanations for your nighttime adventures.',
        setState: {},
        nextText: 203      
      },
      {
        text: 'Integrating AI to create a digital baby sleep diary could have compiled amusing anecdotes about your sleep habits, fostering a playful and memorable parenting experience.',
        setState: {},
        nextText: 203
      },
      {
        text: 'Implementing AI-powered sleep tracking like "DreamWatch" could have provided valuable insights into your sleep habits, offering recommendations and personalized strategies for better sleep quality.',
        setState: {},
        nextText: 202      
      },
      {
        text: 'Utilizing AI to predict your future favorite bedtime stories could have offered whimsical but irrelevant suggestions for your nighttime reading.',
        setState: {},
        nextText: 203      
      }
    ]
  },

  {
    id: 202,
    text: 'Correct! You advance 2 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 8
        }
    ]
  },

  {
    id: 203,
    text: 'Not quite right... you\'ll advance one tile!',
    options: [
        {
            text: 'Continue',
            nextText: 4
        }
    ]
  },


  {
    id: 4,
    text: ' Age 4 : Play Time! \n \n You\'re having a blast with your toy horses, galloping them across your room and making up stories about their adventures. As you play, an idea strikes you. You pause and glance at the home assistant speaker sitting on the shelf nearby. With a sparkle in your eye, you toddle over, toy horse in hand, and look up at the device. "Hey, Alexa/Google/Siri," you say in your sweet, curious voice, "can you get me another horse, please?"',
    options: [
      {
        text: 'Ask Alexa for another horse to enhance your imaginative play.',
        setState: { blueGoo: false, sword: true },
        nextText: 401
      },
      {
        text: 'Request your parents for another horse to add to your playtime adventures',
        setState: { blueGoo: false, shield: true },
        nextText: 404
      }
    ]
  },
  {
    id: 401,
    text: 'As you eagerly requested another horse from the home assistant speaker, it misunderstood your innocent plea and actually initiated a purchase for a real horse online! This mistake caused unintended financial strain and logistical issues for your family, leading to an unexpected and challenging situation that required resolving the purchase and finding a suitable solution for the real horse, all stemming from a simple misunderstanding with the home assistant speaker. \n \n How did AI negatively impact you here?',
    options: [
        {
            text: 'By intentionally causing financial strain as part of its programming.',
            nextText: 403
        },
        {
            text: 'By initiating an online purchase based on a misunderstanding of the your request.',
            nextText: 402
        },
        {
            text: 'By creating logistical issues to test your problem-solving skills.',
            nextText: 403
        },
        {
            text: 'By failing to understand the your request and providing horse facts.',
            nextText: 403
        }
    ]

  },

  {
    id: 404,
    text: 'You stick to the traditional method of asking your parents for another horse. This decision leads to a positive outcome as your parents are aware of your request and can engage in a thoughtful conversation about the responsibilities and considerations involved in having a pet horse. By relying on direct communication, you avoid the unintended financial strain and logistical issues that could have arisen from an automated misunderstanding. \n \n How could AI have impacted this scenario?',
    options: [
      {
        text: 'The home assistant speaker might have used AI to predict your favorite farm animals, offering whimsical information about various creatures.',
        setState: {},
        nextText: 403    
      },
      {
        text: 'Implementing AI-powered language processing in the home assistant speaker could have misunderstood the context of your request, resulting in the accidental online purchase of a real horse and causing unintended financial strain and logistical issues.',
        setState: {},
        nextText: 402       
      },
      {
        text: 'Utilizing AI for predicting your future pet preferences could have offered amusing but unrelated suggestions for virtual animals.',
        setState: {},
        nextText: 403      
      },
      {
        text: 'Using the voice assistant, the AI in it could have made horse noises incessantly until you cried.',
        setState: {},
        nextText: 403      
      }
    ]
  },

  {
    id: 402,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 15,
        }
    ]
  },
  { // incorrect answer
    id: 403,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 8 
        }
    ]
  },

  {
    id: 8,
    text: 'You\'re thrilled when your parents surprise you with RoboBuddy, a new robot toy with shiny LED eyes and a friendly voice. It\'s equipped with cool features like interactive games, quizzes, and even homework help, adapting to your preferences with changing LED eye colors.'
    + 'As you explore its capabilities, you\'re faced with the decision of whether to keep playing with this exciting and educational toy.',
    options: [
        {
            text: 'Keep using AI-powered toy.',
            nextText: 801
        },
        {
            text: 'Play with some other toys instead.',
            nextText: 804 // make another object
        }
    ]
  },

  {
    id: 801,
    text: 'As you dive into the world of RoboBuddy, its AI marvel becomes evident. The toy uses artificial intelligence to adapt and respond to your commands, creating an interactive and dynamic playtime. The AI analyzes your preferences, adjusting the LED eye colors and tailoring its activities to match your interests.' 
    + 'It\'s like having a smart and responsive playmate that learns and grows with you, making every interaction with RoboBuddy a fascinating exploration of technology and fun.' 
    + '\n \n How did AI play a role in your fun time?',
    options: [
        {
            text: 'By aimlessly moving around and randomly performing actions, creating confusion during playtime.',
            nextText: 803
        },
        {
            text: 'By using artificial intelligence to adapt and respond to commands, creating an interactive and dynamic playtime experience.',
            nextText: 802
        },
        {
            text: 'By staying idle in the corner, providing minimal interaction and limiting the playtime experience',
            nextText: 803
        },
        {
            text: 'Through repetitive responses, offering the same robotic reaction to every command and question',
            nextText: 803
        }
    ]

  },

  {
    id: 804,
    text: 'Opting not to play with RoboBuddy, you engage in traditional play activities that foster creativity and imagination. This decision allows you to explore the world around you without relying on the interactive features of the robot toy. By choosing a more hands-on approach, you find joy in unstructured play and open-ended exploration. \n \n How could AI have impacted this scenario?',
    options: [
      {
        text: 'Implementing AI for predicting your future hobbies could have offered whimsical but irrelevant suggestions for activities unrelated to robot toys.',
        setState: {},
        nextText:  803     
      },
      {
        text: 'Implementing AI-powered adaptive learning in RoboBuddy could have recognized your play preferences and adapted its interactive features to provide a more personalized and engaging play experience, making the robot toy even more enjoyable and educational for you.',
        setState: {},
        nextText: 802       
      },
      {
        text: 'Utilizing AI for predicting your favorite colors could have offered amusing but unrelated information about your color preferences.',
        setState: {},
        nextText:  803     
      },
      {
        text: 'By integrating AI in RoboBuddy to teleport you to alternate dimensions where toys come to life could have added an extraordinary twist to your play experience.',
        setState: {},
        nextText:  803     
      }
    ]
  },

  {
    id: 802,
    text: 'Correct! You advance 2 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 13
        }
    ]
  },

  {
    id: 803,
    text: 'Not quite right... you\'ll advance one tile!',
    options: [
        {
            text: 'Continue',
            nextText: 11
        }
    ]
  },

  {
    id: 11,
    text: 'You, a creative young artist, are excited about your upcoming art project. You\'ve heard about this amazing tool called "ArtBot," which uses AI to help'
    + ' create unique and imaginative artworks. As you contemplate using AI for your project, you imagine the endless possibilities it could bring to your creation.'
    + ' The decision is yours: Will you embrace the futuristic magic of AI, letting ArtBot add its own touch to your masterpiece? The thought of collaborating with a virtual artist'
    + ' sparks your curiosity. Can ArtBot enhance your ideas, or will you rely solely on your own creative instincts?',
    options: [
        {
            text: 'Use ArtBot for your project.',
            nextText: 1101
        },
        {
            text: 'Ditch the AI and make the art yourself',
            nextText: 1104
        }
    ]
  },

  {
    id: 1101,
    text: 'ArtBot analyzed your artistic style and incorporated its own suggestions, enhancing the creativity of your art project with a unique blend of human and AI inspiration. \n \n Quiz: How did AI help us here?',
    options: [
        {
            text: 'ArtBot analyzed your artistic style and incorporated its own suggestions, enhancing the creativity of your art project with a unique blend of human and AI inspiration.',
            nextText: 1102
        },
        {
            text: 'ArtBot completely took over the artistic process, erasing your original vision and leaving no room for your personal touch.',
            nextText: 1103
        },
        {
            text: 'ArtBot relied solely on predefined patterns, lacking the adaptability to interpret your specific artistic preferences and deliver a personalized result.',
            nextText: 1103
        },
        {
            text: 'ArtBot, in a wild turn of events, became a self-proclaimed art critic, offering unsolicited opinions on your project\'s shortcomings while neglecting its primary function of collaborative art creation.',
            nextText: 1103
        }
    ]

  },

  {
    id: 1104,
    text: 'You rely solely on your own creative instincts. Unfortunately, without the AI-powered assistance, your artwork lacks the unique flair and innovative elements that ArtBot could have introduced. This decision leads to a less captivating masterpiece, ultimately impacting your grade in the art project. You receive a D- and get grounded. \n \n How could AI have impacted this scenario?',
    options: [
      {
        text:'Implementing AI-powered assistance in ArtBot could have analyzed your artistic style, providing real-time suggestions and enhancements to elevate your art project.',
        setState: {},
        nextText: 1102      
      },
      {
        text: 'You could have used AI to generate a virtual art museum tour could have provided entertaining experiences.',
        setState: {},
        nextText: 1103       
      },
      {
        text: 'You could have used ArtBot for predicting your favorite art supplies',
        setState: {},
        nextText: 1103
      },
      {
        text: 'ArtBot could have helped you decipher hidden messages in famous paintings from ancient civilizations',
        setState: {},
        nextText: 1103      
      }
    ]
  },

  {
    id: 1102,
    text: 'Correct! You advance 2 tiles.',
    options: [
        {
            text: 'Continue',
            nextText:15
        }
    ]
  },

  {
    id: 1103,
    text: 'Not quite right... you\'ll advance one tile!',
    options: [
        {
            text: 'Continue',
            nextText: 13
        }
    ]
  },

  {
    id: 13,
    text: 'As you scroll through Snapchat, you notice that many of your friends are using this new and exciting AI chatbot to spark interesting conversations. The idea of having an AI companion to chat with seems intriguing, and you find yourself contemplating whether to give it a try.'
    + ' On one hand, you hear your friends sharing funny anecdotes about their interactions with the AI, and it seems like a novel and entertaining experience. They talk about how the chatbot suggests conversation topics, shares jokes,'
    + ' and even tries to mimic their writing style. However, on the other hand, a small voice in your head raises questions. Will the AI really understand your'
    + ' unique way of chatting? What if it feels too scripted or impersonal? You value genuine connections and wonder if the AI chatbot can truly capture the essence of a real conversation.',
    options: [
        {
            text: 'Use AI',
            nextText: 1301
        },
        {
            text: 'Don\'t use AI',
            nextText: 1304
        }
    ]
  },

  {
    id: 1301,
    text: 'Embracing the curiosity, you decide to engage with the AI chatbot on Snapchat. To your delight, the chatbot proves to be a delightful companion, suggesting interesting conversation topics and sharing jokes that align with your sense of humor. Its ability to mimic your writing style creates a fun and personalized experience, making your interactions feel engaging and entertaining. The AI chatbot, with its knack for understanding your unique way of chatting, enhances your social media experience with novel and authentic conversations. \n \n How did AI positively affect you in this scenario?',
    options: [
        {
            text: 'Employing AI to analyze global news trends could have offered interesting tidbits of information for your next dinner discussion.',
            nextText: 1303
        },
        {
            text: 'Utilizing AI for generating random trivia questions could have added an element of fun and helped you prep for trivia night.',
            nextText:1303
        },
        {
            text: 'Integrating AI in the chatbot to predict the weather based on your location proved useful in helping you understand the climate.',
            nextText:1303
        },
        {
            text: 'Embedding AI in the chatbot\'s programming to understand and mimic your unique writing style significantly improved the authenticity of the interactions, creating a more personalized and enjoyable chat experience.',
            nextText: 1302
        }
    ]

  },

  {
    id: 1304,
    text: 'You find yourself missing out on the entertaining conversations your friends are having with their virtual companions. As they share amusing anecdotes and inside jokes generated by the AI, your decision to stay away leaves you feeling a bit left out. Over time, the gap in communication widens, and you sense a growing loneliness as your friends continue to enjoy their AI-enhanced social interactions.',
    options: [
      {
        text: 'Implementing AI for tracking daily steps and fitness goals could have provided interesting insights into your physical activity',
        setState: {},
        nextText: 1303      
      },
      {
        text: 'Embedding AI in the chatbot\'s programming to foster genuine and engaging conversations by understanding and mimicking your unique writing style could have positively impacted your social interactions, preventing feelings of loneliness and fostering a sense of connection with your friends.',
        setState: {},
        nextText: 1302      
      },
      {
        text: 'Utilizing AI for organizing your daily schedule could have offered efficient assistance, addressing time management and organizational skills in your daily life.',
        setState: {},
        nextText: 1303     
      },
      {
        text: 'Integrating AI to analyze your music preferences could have delivered entertaining song recommendations and upcoming concerts.',
        setState: {},
        nextText: 1303      
      }
    ]
  },

  {
    id: 1302,
    text: 'Correct! You advance 3 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 20
        }
    ]
  },

  {
    id: 1303,
    text: 'Not quite right... you\'ll advance one tile!',
    options: [
        {
            text: 'Continue',
            nextText: 15
        }
    ]
  },


  {
    id: 15,
    text: 'Age 15 : School\'s In! \n \n Frustrated after spending hours trying to solve equations, you remember hearing about an AI chatbot that offers tutoring assistance. You open the chat window for the AI tutoring service and type: "Hey there! I\'m struggling with algebra and could really use some help. Are you able to assist me with solving equations?" You eagerly await a response, anticipating that this technology might provide the guidance you need to grasp those tricky algebra concepts and complete your homework successfully.',
    options: [
      {
        text: 'Seek help from the AI chatbot for algebra assistance, hoping it can provide the guidance needed to tackle the tricky equations.',
        nextText: 1501
      },
      {
        text: 'Turn to a classmate or teacher for help with algebra, choosing human assistance over the AI chatbot.',
        nextText: 1504
      }
    ]
  },
  {
    id: 1501,
    text: 'Engaging your teacher and fellow students for help with algebra, you receive clear explanations and step-by-step guidance on solving equations. Their patient and detailed support help you grasp the tricky concepts you\'ve been struggling with, allowing you to gain a deeper understanding of algebra. With the assistance of your teacher and peers, you successfully complete your homework, feeling more confident in your problem-solving skills. This positive experience not only aids you in your current assignment but also improves your overall understanding of algebra, setting you up for success in future mathematical challenges. \n \n Quiz: How could AI have affected this scenario? ',
    options: [
        {
            text: 'Gain insights from peers and a teacher, fostering a deeper understanding of algebra.',
            nextText: 1503
        },
        {
            text: 'Receive tailored explanations from a teacher who understands specific struggles.',
            nextText: 1503
        },
        {
            text: 'Enhance communication skills through interaction with teachers and peers.',
            nextText: 1503
        },
        {
            text: 'Using AI could create a reliance on technology, hindering the development of problem-solving skills.',
            nextText: 1502
        }
    ]
  },

  {
    id: 1504,
    text: 'You decide to seek assistance from your teacher and classmates for help with algebra. Engaging in collaborative discussions and learning sessions, you find that the personal interaction and shared insights lead to a deeper understanding of the equations. The human connection fosters a supportive environment, allowing you to not only tackle the algebra challenges but also build a sense of camaraderie with your peers and teacher. \n \n How could AI have affected this situation?',
    options: [
      {
        text: 'Utilizing AI for language translation could have helped you learn Spanish in lieu of your algebra formulas.',
        setState: {},
        nextText: 1503     
      },
      {
        text: 'Using the AI tool could have helped you understand your sleeping patterns for a better resting period and better performance in school.',
        setState: {},
        nextText:     1503  
      },
      {
        text: 'AI could have misinterpreted your algebra questions and provided inaccurate answers due to a misunderstanding of context, ultimately leading to confusion, lower grades, and hindering your understanding of the subject matter.',
        setState: {},
        nextText:  1502     
      },
      {
        text: 'Using AI could have helped you figure out the minimum grade you need to pass the class and graduate on time.',
        setState: {},
        nextText: 1503     
      }
    ]
  },

  {
    id: 1502,
    text:'Correct! You advance 3 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 21,
        }
    ]  
  },
  { // incorrect answer
    id: 1503,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 18
        }
    ]
  },

  // {
  //   id: 18,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 1801,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]

  // },

  // {
  //   id: 1804,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 1802,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 1803,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

// AGE 20

  {
    id: 20,
    text: 'Age 20 : College is hard! \n \n You\'re a college student, and you\'ve been assigned a critical essay for your literature class. The topic is intriguing, but you\'re struggling to organize your thoughts and craft a compelling argument. Remembering a highly recommended AI writing tool, you decide to seek its assistance to improve your essay. You log in to the AI writing tool\'s platform and begin typing, "Hello! I\'m working on an essay about [topic], and I could use some guidance in structuring my arguments and making my writing more impactful. Can you help me refine my ideas and suggest ways to strengthen my essay?"',
    options: [
      {
        text: 'Utilize the AI writing tool for guidance on structuring arguments and improving the impact of your essay.',
        nextText: 2001
      },
      {
        text: 'Reach out to your professor or a classmate for assistance instead, opting for human guidance over the AI writing tool.',
        nextText: 2004
      }
    ]
  },

  {
    id: 2001,
    text: 'Upon engaging the AI writing tool, it analyzes your essay topic and swiftly generates insightful suggestions. The tool offers valuable advice on how to structure your arguments, improve coherence, and enhance the impact of your writing. Its detailed feedback helps you refine your ideas and fine-tune your essay, transforming it into a well-organized and persuasive piece. With the AI\'s guidance, you successfully craft a compelling argument, impressing your literature professor with the depth and coherence of your essay. This positive experience not only improves your current assignment but also enhances your overall writing skills, setting a strong foundation for future academic endeavors. \n \n Quiz: How did AI help us here?',
    options: [
        {
            text: 'By rewriting the entire essay on behalf of the user.',
            nextText: 2003
        },
        {
            text: 'By providing valuable advice on structuring arguments, improving coherence, and enhancing writing impact.',
            nextText: 2002
        },
        {
            text: 'By intentionally introducing errors to test the user\'s proofreading skills.',
            nextText: 2003
        },
        {
            text: 'By suggesting irrelevant points to include in the essay to challenge the user\'s critical thinking.',
            nextText: 2003
        }
    ]

  },

  {
    id: 2004,
    text: 'Opting not to use the AI writing tool, you decide to reach out to your literature professor for guidance on your critical essay. Through one-on-one discussions and feedback from your teacher, you gain valuable insights into structuring arguments, refining your ideas, and enhancing the overall quality of your writing. This personal interaction fosters a deeper understanding of the subject matter and allows you to develop strong writing skills with the guidance of an experienced mentor. \n \n How could have AI impacted this situation?',
    options: [
      {
        text: 'Through recommending meditation techniques to reduce stress and enhance your overall well-being during the essay-writing process.',
        setState: {},
        nextText:   2003    
      },
      {
        text: 'By generating random writing prompts to spark creativity in unrelated areas.',
        setState: {},
        nextText: 2003       
      },
      {
        text: 'By suggesting daily workout routines to keep you physically active and improve your essay-writing focus.',
        setState: {},
        nextText:    2003   
      },
      {
        text: 'By automatically generating the entire essay based on the given topic, increasing the chances of being accused of plagiarism.',
        setState: {},
        nextText:   2002    
      }
    ]
  },

  {
    id: 2002,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 26,
        }
    ]  
  },
  {
    id: 2003,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 21 // fix
        }
    ]
  },

  {
    id: 21,
    text: 'As a 21-year-old navigating the competitive job market, you find yourself contemplating the integration of AI to enhance your resume. Picture the'
    + ' potential benefits - AI-driven tools optimizing your resume content, tailoring it to specific job requirements, and even suggesting personalized'
    + 'skills and achievements. The decision lies in your hands: Will you embrace the technological edge to stand out in the job hunt, or opt for a more traditional approach to crafting your resume?',
    options: [
        {
            text: 'Enhance your resume with AI, leveraging smart algorithms to analyze trends and tailor it for your dream job.',
            nextText: 2101
        },
        {
            text: 'Craft your resume conventionally, relying on your insights and experiences. Choose between AI optimization or a personal touch.',
            nextText: 2104
        }
    ]
  },

  {
    id: 2101,
    text: 'Embracing the allure of AI to enhance your resume, you opt for automated tools that promise to optimize your content based on job requirements. However, the AI algorithms, despite their efficiency, occasionally misinterpret your skills and achievements. As a result, your resume ends up highlighting skills you don\'t possess, leading to awkward moments during interviews when you struggle to demonstrate expertise in those misrepresented areas. The attempt to gain a technological edge ends up backfiring, creating challenges in securing a job.',
    options: [
        {
            text: 'The AI-generated resume, while grammatically polished, lacked the personal touch needed to convey your passion and enthusiasm.',
            nextText:2103
        },
        {
            text: 'The AI inaccurately suggested irrelevant skills, causing confusion in job interviews and creating a mismatch between your actual capabilities and the portrayed expertise.',
            nextText: 2102
        },
        {
            text: 'The AI, aiming for innovation, introduced unconventional formats and designs that were deemed unprofessional by industry standards, negatively impacting your job application.',
            nextText:2103
        },
        {
            text: 'Unexpectedly, the AI generated a resume focusing solely on one aspect of your skill set, neglecting the diversity of your capabilities and limiting your opportunities in the job market.',
            nextText:2103
        }
    ]

  },

  {
    id: 2104,
    text: 'Without leveraging AI, your resume remains static, lacking the dynamic adjustments and tailored enhancements that could optimize its appeal to potential employers. The absence of AI-driven insights results in missed opportunities to highlight specific skills and achievements tailored to various job requirements. As the job market evolves, your traditionally crafted resume may struggle to stand out, potentially leading to fewer interview opportunities. This hinders your ability to showcase your full potential and adapt to the changing demands of the competitive job landscape. You are jobless after college. \n \n How could have AI improved results?',
    options: [
      {
        text: 'AI might have provided personalized insights, tailoring your resume to specific job requirements, increasing its appeal to potential employers.',
        setState: {},
        nextText: 2102      
      },
      {
        text: 'AI might have suggested adding emojis and GIFs to your resume, thinking it would make it more visually appealing.',
        setState: {},
        nextText:   2103    
      },
      {
        text: 'AI might have insisted on translating your entire resume into an ancient language, assuming it would impress employers with its uniqueness.',
        setState: {},
        nextText:  2103     
      },
      {
        text: 'AI could have suggested attaching a video of you performing a stand-up comedy routine alongside your resume, thinking it would showcase your sense of humor.',
        setState: {},
        nextText:   2103    
      }
    ]
  },

  {
    id: 2102,
    text: 'Correct! You advance 3 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 33
        }
    ]
  },

  {
    id: 2103,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
            text: 'Continue',
            nextText:26
        }
    ]
  },

// AGE 26

  {
    // death
    id: 26,
    text: 'Age 26 : Shoplifting \n \n In a community plagued by frequent shoplifting, local detectives resort to cutting-edge AI and facial recognition technology to track down the culprits. Uploading surveillance footage into the system, the AI meticulously scans and cross-references facial features and clothing details, sifting through vast amounts of data. Swiftly, the software begins generating potential matches, highlighting individuals who appeared at multiple stores during reported theft times. Armed with these AI-provided leads, the detectives launch targeted inquiries and surveillance, narrowing down their search to a handful of suspects.',
    options: [
      {
        text: 'Use AI and facial recognition to catch shoplifters based on surveillance data.',
        nextText: 2601
      },
      {
        text: 'Depend on witnesses and evidence without AI for catching shoplifters.',
        nextText: 2604
      }
    ]
  },
 {
    id: 2601,
    text: 'Thanks to the AI\'s meticulous analysis and the generated leads, detectives swiftly identify and apprehend the shoplifting culprits. The targeted inquiries and surveillance based on the AI-provided matches lead the investigation to the actual individuals responsible for the thefts. This successful use of AI aids in locating and apprehending the culprits, resulting in their arrest and subsequent legal proceedings. \n \n Quiz: How did AI help us here?',
    options: [
        {
            text: 'By intentionally misguiding the detectives to test their investigative skills.',
            nextText: 2603
        },
        {
            text: 'By utilizing facial recognition technology to meticulously analyze surveillance data, generating leads that swiftly identify the shoplifting culprits.',
            nextText:2602
        },
        {
            text: 'By creating obstacles in the investigation process to challenge the detectives\' problem-solving abilities.',
            nextText: 2603
        },
        {
            text: 'By withholding crucial information to assess the detectives\' reliance on AI technology.',
            nextText: 2603
        }
    ]
 },

 {
  id: 2604,
  text: 'You find yourself caught in a web of unreliable witness testimonies and circumstantial evidence. Without the advanced facial recognition capabilities of AI, the investigation relies heavily on human memory, which can be fallible and subject to bias. This lack of technological support leads to a situation where you are wrongfully charged with the crime, despite having no involvement in the shoplifting incidents. \n \n How could AI have positively impacted this situation?',
  options: [
    {
      text: 'AI might have recommended disguises to the shoplifters, making them unrecognizable and avoiding any identification through facial recognition.',
      setState: {},
      nextText: 2603     
    },
    {
      text: 'AI could have randomly assigned blame to innocent individuals, confusing the detectives and hindering their ability to identify the actual culprits.',
      setState: {},
      nextText:   2603    
    },
    {
      text: 'AI may have suggested erasing all traces of the shoplifters from surveillance footage, leaving investigators with no leads.',
      setState: {},
      nextText:     2603  
    },
    {
      text: 'AI would have efficiently and accurately identified the real culprits by analyzing facial features and clothing details, providing reliable leads for the detectives.',
      setState: {},
      nextText:  2602     
    }
  ]
},

   {
    id: 2602,
    text:'Correct! You advance 3 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 35,
        }
    ]  
   },
   {
    id: 2603,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 29 // fix
        }
    ]
   },



   // AGE 29

  {
    //death
    id: 29,
    text: 'Age 29 : I do! \n \n You\'re getting married soon, and you\'ve been pondering over your vows for days. You want them to be heartfelt, eloquent, and truly reflective of your love for your soon-to-be spouse. Wanting to ensure that your vows are as perfect as possible, you turn to an AI writing assistant for help. You open the AI writing tool and begin typing, "Hello! I\'m writing my vows for my upcoming wedding and I want them to be absolutely beautiful and meaningful. Can you assist me in creating heartfelt and poetic vows that will resonate with my future spouse?"',
    options: [
      {
        text: 'Use the AI writing assistant to craft heartfelt and poetic wedding vows that resonate with your future spouse.',
        nextText: 2901
      },
      {
        text: 'Seek guidance from friends or family in creating your wedding vows and write them yourself.',
        nextText: 2904
      }
    ]
  },

  {
    id: 2901,
    text:'Unfortunately, your fiancée accidentally discovers that an AI writing assistant helped craft your wedding vows. Feeling hurt and betrayed by this revelation, they express disappointment and a sense of betrayal, feeling that the vows should have come from your heart rather than being composed by a machine. Their trust in the sincerity of your words is shaken, leading to doubts about the authenticity of your feelings. Regrettably, this discovery causes significant tension and ultimately leads to the difficult decision to call off the wedding, as your partner grapples with the authenticity and depth of your emotions. \n \n Quiz: Why did AI get us in such a bad place?',
    options: [
        {
            text: 'By intentionally causing conflict and tension as part of its programming.',
            nextText: 2903
        },
        {
            text: 'The AI-generated vows lacked personalization, causing hurt and disappointment.',
            nextText: 2902
        },
        {
            text: 'By suggesting inappropriate content in the wedding vows to test the user\'s judgment.',
            nextText: 2903
        },
        {
            text: 'By purposely withholding information about its involvement in crafting the vows to create suspense.',
            nextText: 2903
        }
    ]
    
  },

  {
    id: 2904,
    text: 'Opting not to use AI, you embark on a journey through memories with your fiancée, reminiscing about the special moments that define your relationship. Inspired by these shared experiences, you craft heartfelt and personalized vows that capture the essence of your unique connection. Your fiancée is over the moon with the sincerity and thoughtfulness embedded in your words, making your wedding ceremony a deeply emotional and joyous occasion. By relying on genuine emotions and shared memories, you create vows that resonate authentically with both you and your future spouse.',
    options: [
      {
        text: 'AI might have generated generic and impersonal vows, lacking the depth and authenticity of your shared memories.',
        setState: {},
        nextText: 2902     
      },
      {
        text: 'AI may have focused on historical facts rather than personal sentiments, exploring the causes behind the War of 1812.',
        setState: {},
        nextText:  2903     
      },
      {
        text: 'AI might have suggested not marrying your spouse and breaking things off with them instead.',
        setState: {},
        nextText:   2903    
      },
      {
        text: 'AI might have proposed a vow involving intergalactic love, including referencing your fiancé as an extraterrestrial.',
        setState: {},
        nextText:  2903    
      }
    ]
  },

  {
    id: 2902,
    text:'Correct! You advance 2 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 35, // fix
        }
    ]  
   },
   {
    id: 2903,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 33 
        }
    ]
   },




// AGE 33

  {
    id: 33,
    text: 'Age 33 : Health Scare \n \n During a routine check-up, a concerning mass is found by your doctor, prompting further testing. Advanced imaging tests, supported by AI-driven diagnostic tools, thoroughly analyze the mass for any signs of malignancy.  The AI algorithms compare detailed scans against extensive databases to detect abnormalities or indications of cancer. Anxiously awaiting results, you rely on the AI\'s assistance to aid the medical team in charting the best path forward for your health.',
    options: [
      {
        text: 'Seek guidance from friends or family in creating your wedding vows and write them yourself.',
        nextText: 3301
      },
      {
        text: 'Seek guidance from friends or family in creating your wedding vows and write them yourself.',
        nextText: 3304
      }
    ]
  },

  {
    id: 3301,
    text: 'Through advanced imaging and AI-driven diagnostics, the mass is identified early as potentially cancerous. The AI\'s detailed analysis aids in swift detection, allowing doctors to initiate precise treatment promptly. This early identification enables tailored therapy, ensuring a positive prognosis. Thanks to this early detection and targeted treatment, you undergo successful therapy, leading to your recovery. The combination of AI technology and timely intervention contributes significantly to your restored health. \n \n Quiz: How did AI help us here?',
    options: [
        {
           text: 'By intentionally causing confusion in the diagnosis process to test the user\'s medical knowledge.',
           nextText: 3303
        },
        {
            text: 'By providing emotional support during the therapy sessions.',
            nextText: 3303
        },
        {
            text: 'By contributing to the early identification of a potentially cancerous mass through advanced imaging and AI-driven diagnostics.',
            nextText: 3302
        },
        {
            text: 'By intentionally delaying the treatment process to assess the user\'s patience.',
            nextText: 3303
        }
    ]

  },

  {
    id: 3304,
    text: 'Choosing not to use them resulted in critical consequences. Without AI assistance, there were delays in accurately identifying the nature and severity of the mass found during the routine check-up. This delay led to a late-stage diagnosis, requiring more aggressive treatments like chemotherapy, potentially impacting your well-being and leading to an extended recovery period. \n \n How could AI have impacted this situation?',
    options: [
      {
        text: 'Sending a telepathic message to the tumor to behave itself.',
        setState: {},
        nextText: 3303      
      },
      {
        text: 'Analyzing detailed scans with advanced algorithms to detect abnormalities or signs of cancer.',
        setState: {},
        nextText:       3302
      },
      {
        text: 'Developing a personalized wellness plan that includes daily doses of laughter.',
        setState: {},
        nextText:  3303     
      },
      {
        text: 'Harnessing the power of intergalactic energy to heal the mass and restore balance to the force.',
        setState: {},
        nextText:   3303    
      }
    ]
  },

  {
    id: 3302,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 42, // fix
        }
    ]  
   },
   {
    id: 3303,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 35 
        }
    ]
   },

   {
    id: 35,
    text: 'As an aspiring entrepreneur, you find yourself at a crossroads, considering the integration of AI into your business. Envision the potential benefits, such as AI-powered chatbots for customer support and personalized marketing campaigns. While the promises of automation and innovation are appealing, questions about data security and the need for traditional approaches linger.'
    + ' The decision is yours: will you explore the possibilities of AI to enhance your business, or opt for more conventional methods?',
    options: [
        {
            text: 'Embrace AI for business transformation with chatbots, personalized marketing, and advanced analytics.',
            nextText: 3501
        },
        {
            text: 'Stick to traditional methods for your entrepreneurial journey.',
            nextText: 3504
        }
    ]
  },

  {
    id: 3501,
    text: 'Choosing to integrate AI into your business could yield numerous benefits, such as streamlined customer support with AI-powered chatbots and highly targeted personalized marketing campaigns. The AI-driven tools help you navigate the complex world of recruitment, allowing the resume scanner to efficiently select qualified candidates for interviews. This leads to the formation of a stellar team, kickstarting your company with a talented and diverse workforce.  \n \n How could not using AI have impacted this situation?',
    options: [
        {
            text: 'You would have had to convene a council of mystical beings to predict the future success of potential hires.',
            nextText: 3503
        },
        {
            text: 'You would have had to sort through resumes manually without AI assistance, leading to a time-consuming process, overlooking qualified candidates, and delaying the start of your business.',
            nextText: 3502
        },
        {
            text: 'You would have had to train a group of psychic squirrels to assist in the hiring process.',
            nextText: 3503
        },
        {
            text: 'You would have had to delegate the task to your enthusiastic toddler, resulting in a series of random selections and a less-than-professional hiring process.',
            nextText: 3503
        }
    ]

  },

  {
    id: 3504,
    text: 'Choosing not to use AI, you rely on traditional methods, manually sorting through resumes. Unfortunately, the overwhelming volume of applications leads to oversight, possibly missing out on qualified candidates and hindering your ability to build a diverse and skilled team. The process becomes time-consuming and less efficient, delaying the establishment and growth of your business. You fail to support your family for 6 months. \n \n How could using AI have impacted this situation?',
    options: [
      {
        text: 'By sending personalized thank-you notes to each applicant.',
        setState: {},
        nextText: 3503       
      },
      {
        text: 'By creating holographic interviews to personally interact with each candidate.',
        setState: {},
        nextText:   3503    
      },
      {
        text: 'By using drones to deliver job offers in a futuristic and attention-grabbing way.',
        setState: {},
        nextText:   3503    
      },
      {
        text: 'By efficiently analyzing resumes and identifying the most suitable candidates, streamlining the hiring process.',
        setState: {},
        nextText: 3502      
      }
    ]
  },

  {
    id: 3502,
    text: 'Correct! You advance 3 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 42
        }
    ]
  },

  {
    id: 3503,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
            text: 'Continue',
            nextText: 38
        }
    ]
  },


  {
    id: 38,
    text: 'At 38, cruising around in a new area, you\'re thinking of using AI to find your way home with GPS. The AI-driven navigation can give you '
    + 'real-time traffic scoop, suggesting cool shortcuts and making your drive a breeze. On the other hand, you also think you can test your memory and '
    +'find your way home. Will you embrace AI to enhance your navigation experience, or do you bet you can remember your way home?',
    options: [
        {
            text: 'Let\'s roll with AI GPS! It\'s like having a navigation buddy – real-time updates, shortcuts, and a smoother ride home.',
            nextText: 3801
        },
        {
            text: 'Keep it old-school! Trust your gut and the paper map. Decide between AI ease or the charm of navigating your way home the classic way.',
            nextText: 3804
        }
    ]
  },

  // {
  //   id: 3801,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]

  // },

  // {
  //   id: 3804,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 3802,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 3803,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  {
    id: 40,
    text: 'At 40 years old, facing a legal dilemma in the courtroom, where you are being accused of stealing from your neighbor! The judge considers implementing facial recognition AI to match the defendant\'s'
    + ' face with pertinent databases, potentially influencing the case outcome. The facial recognition AI would analyze your facial features, comparing '
    + 'them to relevant databases, and present the results as evidence to determine potential matches or similarities. Alternatively, should the '
    + 'courtroom opt against using AI, the identification process would rely on traditional methods, such as eyewitness accounts and manual comparison '
    + 'of photographs. In this pivotal moment, the question arises: Should facial recognition AI be embraced for its potential accuracy, or should '
    + 'the court stick to conventional methods in this legal proceeding?',
    options: [
        {
            text: 'Embrace the use of facial recognition AI for its potential accuracy, providing an advanced tool to aid in the identification '
            + 'process and enhance the legal proceedings.',
            nextText: 4001
        },
        {
            text: 'Opt for traditional methods, avoiding the potential ethical and privacy concerns associated with facial recognition AI and relying '
            + 'on established practices within the courtroom.',
            nextText: 4004
        }
    ]
  },

  {
    id: 4001,
    text: 'In the courtroom, the decision to employ facial recognition AI led to an alarming turn of events. The AI tool, with biases embedded in its data modeling, erroneously identified you as the perpetrator. Regrettably, the court, relying on the flawed AI results, wrongfully convicted you, subjecting you to an unjust three-year jail sentence. \n \n How could not using AI have impacted this situation?',
    options: [
        {
            text: 'By employing psychics to sense the truth in the courtroom.',
            nextText: 4003
        },
        {
            text: 'By including the use of traditional methods, like eyewitness accounts and manual photo comparisons, to ensure a more all-encompassing and just identification process.',
            nextText: 4002
        },
        {
            text: 'By consulting a magic eight-ball for a definitive answer on your innocence.',
            nextText: 4003
        },
        {
            text: 'By hiring a team of sketch artists to create detailed portraits of random people that could be potential suspects.',
            nextText: 4003
        }
    ]

  },

  {
    id: 4004,
    text: 'In a pivotal courtroom moment, the decision not to use facial recognition AI turned out to be a crucial factor in securing justice. The court opted for traditional methods, relying on sketches, eyewitness accounts, and other manual comparisons. This careful approach highlighted the limitations and potential biases of AI systems, ensuring a fair trial that ultimately led to your acquittal. The case demonstrated the significance of human judgment and the careful consideration of evidence in legal proceedings. \n How could using AI have impacted this situation?',
    options: [
      {
        text: 'Implementing AI might have resulted in the judge receiving an endless stream of cat memes, disrupting the seriousness of the trial.',
        setState: {},
        nextText:   4003    
      },
      {
        text: 'By using AI, the court might have accidentally summoned a holographic expert witness, causing confusion and chaos in the courtroom.',
        setState: {},
        nextText:   4003    
      },
      {
        text: 'The AI could have introduced unforeseen biases due to poor data collection and modeling, leading to an inaccurate identification and potentially affecting the court\'s decision.',
        setState: {},
        nextText:   4002    
      },
      {
        text: 'Using AI could have added a futuristic and tech-driven dimension to the legal proceedings, potentially influencing perceptions and attitudes within the courtroom.',
        setState: {},
        nextText:      4003 
      }
    ]
  },

  {
    id: 4002,
    text: 'Correct! You advance 3 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 48
        }
    ]
  },

  {
    id: 4003,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
            text: 'Continue',
            nextText: 42
        }
    ]
  },


  // {
  //   id: 42,
  //   text: 'At 42, managing family plans and finances, you\'re pondering the idea of bringing AI into the mix to make life a bit smoother—helping '
  //   +'with budgeting, suggesting wise investments, and generally taking some weight off your financial shoulders. The AI assistant could help by '
  //   + ' diving into your spending habits, recommending budget tweaks, and highlighting investment opportunities—a kind of digital assistant for your money matters. '
  //   + 'Without AI, family planning and financial management would rely on traditional methods, such as manual budgeting and periodic consultations '
  //   + 'with financial advisors, potentially missing out on real-time insights and personalized recommendations.',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 4201,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]

  // },

  // {
  //   id: 4204,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 4202,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 4203,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },


  // {
  //   id: 45,
  //   text: 'At 45, grappling with a hectic schedule and grocery shopping demands, you contemplate employing AI to streamline your personal grocery '
  //   + 'shopping experience. The AI, acting as a smart shopping assistant, would analyze your dietary preferences, past purchase history, and '
  //   + 'current needs to generate a tailored shopping list, suggest recipe ideas, and even alert you to relevant discounts and promotions. '
  //   + 'Without AI, the alternative would involve manually creating shopping lists, navigating crowded grocery stores, and relying on memory or '
  //   + ' handwritten notes, potentially leading to oversights and less efficient shopping trips. Should you embrace AI to '
  //   + ' revolutionize your grocery shopping routine, leveraging its analytical capabilities, or stick to the traditional, hands-on approach?',
  //   options: [
  //       {
  //           text: 'Embrace the AI-powered shopping assistant for a more efficient and personalized grocery shopping experience, with tailored lists, '
  //           + 'recipe suggestions, and potential cost savings.',
  //           nextText:
  //       },
  //       {
  //           text: 'Stick to the traditional, hands-on approach of manual shopping lists and navigating the grocery store without the assistance of AI, preferring to handpick everything yourself.',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 4501,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]

  // },

  // {
  //   id: 4504,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 4502,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 4503,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 48,
  //   text: 'At 48, facing unpredictable weather patterns, you ponder the use of AI for weather forecasting to ensure dressing appropriately for the day ahead. '
  //   + 'The AI weather forecasting tool would analyze real-time weather data, considering factors like temperature, humidity, and precipitation, and '
  //   + 'provide personalized outfit recommendations to suit the day\'s conditions. Without AI, the alternative would involve relying on traditional '
  //   + 'weather forecasts from news sources or smartphone apps. Now, the decision is in your hands: Opt for AI\'s '
  //   + 'precision in weather forecasts or stick to the conventional approach?',
  //   options: [
  //       {
  //           text: 'Embrace the convenience of AI for accurate weather forecasts, ensuring you dress appropriately and stay prepared for changing weather '
  //           + 'conditions.',
  //           nextText:
  //       },
  //       {
  //           text: 'Stick with the familiarity of traditional weather methods, recognizing the occasional unpredictability, but maintaining a more hands-on '
  //           + 'and adaptive approach to dressing for the day.',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 4801,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       },
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]

  // },

  // {
  //   id: 4804,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 4802,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },

  // {
  //   id: 4803,
  //   text: '',
  //   options: [
  //       {
  //           text: '',
  //           nextText:
  //       }
  //   ]
  // },



  // {
  //   id: 50,
  //   text: 'Age 50 : New Toy! \n \n On your 50th birthday, your family surprises you with a cutting-edge self-driving car, a gift that leaves you awestruck and excited. Eager to experience this revolutionary technology firsthand, you embark on a test drive with your loved ones. Amidst the thrill of witnessing the car\'s capabilities, you enjoy the freedom to relax and engage with your family, feeling like a passenger on an extraordinary journey. The car\'s sensors and AI algorithms seamlessly guide it through traffic, giving you a taste of the future of transportation.',
  //   options: [
  //     {
  //       text: 'Embrace the gift of a self-driving car, enjoying the thrill of a test drive guided by the car\'s sensors and AI algorithms.',
  //       nextText: 8
  //     },
  //     {
  //       text: 'Opt for traditional driving experiences, preferring to be in control without relying on self-driving technology for transportation.',
  //       nextText: 0
  //     }

  //   //   {
  //   //     text: 'Attack it with your sword',
  //   //     requiredState: (currentState) => currentState.sword,
  //   //     nextText: 9
  //   //   },
  //   //   {
  //   //     text: 'Hide behind your shield',
  //   //     requiredState: (currentState) => currentState.shield,
  //   //     nextText: 10
  //   //   },
  //   //   {
  //   //     text: 'Throw the blue goo at it',
  //   //     requiredState: (currentState) => currentState.blueGoo,
  //   //     nextText: 11
  //   //   }
  //   ]
  // },
  // {
  //   id: 5001,
  //   text: 'However, during your test drive, a mishap occurs when the self-driving car\'s AI mistakenly identifies a truck, resulting in a collision. You experience the shock and impact of the accident, sustaining terrible injuries due to the collision caused by the AI\'s misinterpretation. The accident prompts a reassessment of the technology\'s safety and highlights the necessity for further advancements and stringent safety protocols in self-driving vehicles. \n \n Quiz: Why did AI get us in such a bad place?',
  //   options: [
  //     {
  //       text: 'By intentionally causing accidents to test the user\'s reaction and coping skills.',
  //       nextText: 5003
  //     },
  //     {
  //       text: ' By accidentally misidentifying a truck, leading to a collision and causing injuries.',
  //       nextText: 5002
  //     },
  //     {
  //       text: 'By suggesting unsafe driving practices to challenge the user\'s decision-making abilities.',
  //       nextText: 5003
  //     },
  //     {
  //       text: 'By purposely ignoring safety protocols to evaluate the user\'s response in emergency situations.',
  //       nextText: 5003
  //     }
  //   ]
  // },

  // {
  //   id: 5004,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },
  // {
  //   id: 5002,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 5003,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 53,
  //   text: 'At 53, thinking about simplifying life at home, you\'re mulling over the idea of bringing in some smart house AI magic. The smart house AI '
  //   + 'would serve as a digital home manager, automating tasks like adjusting lighting, controlling thermostats, and monitoring security, '
  //   + 'offering convenience and personalized settings tailored to your daily routines. On the flip side, without the AI, it\'s back to doing things the old-school '
  //   + 'way and staying in control – manually adjusting settings and keeping an eye on everything. Should you welcome smart house AI into your home, streamlining '
  //   + 'tasks and enhancing convenience, or stick to the traditional, hands-on approach to home management?',
  //   options: [
  //     {
  //       text: 'Dive into the future of home management by embracing smart house AI, letting it handle tasks like lights, temperature, and security for a more automated and convenient living experience.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Stick to the familiar routine of manually managing home tasks without AI, maintaining a hands-on approach to home management.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 5301,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 5304,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 5302,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 5303,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 55,
  //   text: 'At 55, with security in mind, you find yourself pondering the adoption of AI for personal security and smart surveillance. The AI-driven security system would '
  //   + 'act as a vigilant guardian, using facial recognition, motion detection, and smart surveillance to enhance home security, providing real-time alerts and maintaining a watchful '
  //   + 'eye on your property. On the flip side, without implementing AI, you would rely on traditional security measures, such as manual surveillance, alarms, and locks. '
  //   + 'Should you embrace AI for an elevated level of personal security and surveillance, or stick to conventional methods for safeguarding your home?',
  //   options: [
  //     {
  //       text: 'Embrace the advanced security features of AI, fortifying your home with facial recognition, motion detection, and smart surveillance for a vigilant and real-time security system.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Stick to traditional security measures, relying on manual surveillance, alarms, and locks without the integration of AI, maintaining a more conventional approach to home security.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 5501,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 5504,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 5502,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 5503,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },
  
  // {
  //   id: 57,
  //   text: 'At 57, venturing into a new business endeavor, you contemplate the use of AI to streamline the hiring process and sift through resumes for your upcoming company. '
  //   + 'The AI recruitment tool would analyze resumes using advanced algorithms, identifying relevant skills, experiences, and qualifications, providing a more efficient and '
  //   + 'data-driven approach to shortlisting candidates. Without AI, the process leans on human judgment, offering a more personalized touch and a greater focus on assessing soft '
  //   + 'skills and cultural fit. Should you leverage AI to enhance the efficiency and objectivity of your hiring process, or stick to traditional methods to have a more personal '
  //   + 'selection of your employees?',
  //   options: [
  //     {
  //       text: 'Utilize AI for streamlined efficiency in resume analysis and data-driven hiring decisions.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Embrace a personal touch without AI, relying on human judgment for a more personalized hiring approach.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 5701,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 5704,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 5702,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 5703,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 60,
  //   text: 'Turning 60 and gearing up for your big birthday bash, you\'re pondering whether to let AI handle the invites. Picture this: AI making life easier '
  //   + 'by sorting contacts, crafting personalized invites, and keeping track of RSVPs, making the whole birthday shindig a breeze. But, hey, not using AI could mean '
  //   + 'going old school – personalizing each invite by hand, giving them a special touch and creating an intimate vibe for the celebration. What suits your vision for your 60th birthday party?',
  //   options: [
  //     {
  //       text: 'Let AI do its thing, handling invites and RSVPs for a stress-free birthday party setup.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Go for the personal touch, crafting each invite by hand and adding a unique flair to make your celebration extra special.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 6001,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6004,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6002,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 6003,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 62,
  //   text: 'At 62, facing potential fraud in a mobile payment service app, you\'re pondering whether to use AI to address the situation. Using an AI chatbot, you could '
  //   + 'streamline the process by quickly interacting to investigate and potentially recover the money lost due to fraud. On the flip side, opting not to use AI might '
  //   + 'involve a more traditional approach, such as speaking to a human representative on the phone to address and resolve the fraud issue.',
  //   options: [
  //     {
  //       text: 'Use the AI chatbot to swiftly investigate and potentially recover the money lost due to fraud in the mobile payment service app.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Opt for a human touch by speaking to a representative on the phone, addressing the fraud issue in a more traditional and personalized manner.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 6201,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6204,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6202,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 6203,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 65,
  //   text: 'At 65, thinking about keeping tabs on your health, you\'re weighing the idea of using AI for some personalized health advice.Picture this: Using a cool AI health tracker, like a chatbot, to get real-time tips, track your health stuff, and maybe pick up some insights along the way. On the flip side, skipping the AI might mean doing it old school – chatting with a human on the phone, getting personalized health advice, the classic way. Now, the real talk: Do you go with the tech-savvy AI for hassle-free health tracking, or stick to the good chat with a human for that personal touch?',
  //   options: [
  //     {
  //       text: 'Roll with the AI health tracker, getting those real-time tips and personalized insights for an easy-breezy health journey.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Keep it classic, dial up a human on the phone for that personalized health advice and guidance.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 6501,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6504,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6502,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 6503,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 68,
  //   text: 'At 68, eyeing goodies for your new grandkids, you\'re weighing the option of using AI recommendations on a shopping app. Picture this: Glancing at AI-suggested purchases, letting the smart algorithms guide your choices for age-appropriate gifts and possibly snagging some discounts in the process. On the flip side, steering clear of AI might mean going the traditional route – having a chat with a human on the phone, seeking advice, and making purchases with a personal touch. Now, the question on the table: Should you trust the AI for a tech-savvy shopping spree, or keep it classic with a more human-centric approach?',
  //   options: [
  //     {
  //       text: 'Dive into the digital realm, relying on AI-recommended purchases for a quick and efficient shopping spree, ensuring you pick out the perfect gifts for your grandkids.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Stick with the tried-and-true method, have a chat with a human on the phone, getting personalized advice and recommendations for a more traditional and hands-on approach to spoil your new grandkids. ',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 6801,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6804,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 6802,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 6803,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 70,
  //   text: 'At 70, eager to enhance joint well-being, you\'re mulling over the prospect of employing AI to curate a novel fitness regimen. Enlisting AI assistance to devise a customized exercise plan that takes into account your joint health, fitness level, and preferences could deliver a tailored and efficient approach. Bypassing the AI route, however, might involve a more conventional avenue – engaging in a dialogue with a fitness expert over the phone, seeking advice, and formulating a workout plan with a personalized touch. Should you let AI steer the ship for a cutting-edge and personalized fitness plan, or adhere to a more hands-on approach?',
  //   options: [
  //     {
  //       text: 'Dive into the tech realm, harness AI to design a bespoke workout plan tailored to your joint health and fitness objectives, ensuring an efficient and customized exercise routine.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Have a chat with a fitness expert over the phone, obtaining personalized advice and constructing a personalized and age-appropriate workout plan.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 7001,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7004,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7002,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 7003,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 73,
  //   text: 'At 73, contemplating a trip to the doctor\'s, you\'re weighing the option of using a self-driving car taxi. Opting for a self-driving car taxi, guided by AI, to effortlessly navigate the journey to your doctor\'s appointment can provide convenience and a quiet travel experience. On the flip side, ordering a human-driven taxi might involve having a nice conversation with another person and effective communication with the driver about your journey. Should you embrace the convenience of a self-driving car taxi for a hassle-free trip to the doctor, or take the chance to have a pleasant ride with a real driver?',
  //   options: [
  //     {
  //       text: 'Dive into the future, hop on the self-driving car taxi for a convenient and hands-free journey to your doctor\'s appointment, enjoying the benefits of automated transportation.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Keep it classic, engage in a conversation with a human on the phone, arrange transportation, and have a human driver navigate the journey to your doctor\'s appointment.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 7301,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7304,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7302,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 7303,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 75,
  //   text: 'At 75, you receive a call from the President, who urgently needs your support and requests a $500 contribution to his campaign. In the call, the president sounds convincing and asks for your debit card information to process the donation promptly. Considering the alternative, you might wonder about the legitimacy of the call, asking how he got your number, and insisting that you could contribute later through his official campaign website, ensuring a secure and verified transaction. Should you provide your debit card information over the phone for the President, or take a more cautious approach?',
  //   options: [
  //     {
  //       text: 'Refrain from providing debit card information over the phone, and instead opt to contribute later through the President\'s official campaign website',
  //       nextText: 
  //     },
  //     {
  //       text: 'Abide by the President\'s wishes and give your debit card information to support his campaign.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 7501,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7504,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7502,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 7503,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 77,
  //   text: 'At 77, facing a new diagnosis, you\'re contemplating the use of an AI tool that recommends medication. Using the AI tool could offer quick and efficient recommendations, taking into account vast medical databases and emerging research, providing a potentially comprehensive and up-to-date analysis. On the other hand, consulting a doctor personally provides the benefits of a human touch, personalized care, and the ability to discuss the diagnosis and treatment options in-depth, fostering a deeper understanding of your health. Should you rely on the AI tool for medication recommendations, or opt for the personal touch of consulting a doctor?',
  //   options: [
  //     {
  //       text: 'Embrace the tech-savvy approach, use the AI tool for efficient medication recommendations based on extensive data and research, ensuring a quick and potentially comprehensive analysis.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Keep it personal, consult a doctor in person for a human-centric approach, receiving personalized care, the opportunity for in-depth discussions, and a deeper understanding of your health in the face of a new diagnosis.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 7701,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7704,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7702,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 7703,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 78,
  //   text: 'At 78, feeling a chill at home, you\'re contemplating using an AI smart home voice assistant to increase the temperature. Using the AI tool allows you to effortlessly control the temperature, providing convenience and independence, especially when you might not want to bother your grandkid for a simple task. On the flip side, asking your grandkid to adjust the temperature will make sure you are heard correctly and get the chance to chat with your darling! Should you use the AI smart home assistant for a quick temperature adjustment, or opt for asking your grandkid?',
  //   options: [
  //     {
  //       text: 'Embrace the convenience of AI, use the smart home voice assistant to effortlessly increase the temperature, ensuring independence and convenience.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Keep it personal, ask your grandkid for assistance in adjusting the temperature, fostering a sense of connection and giving them the opportunity to help.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 7801,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7804,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 7802,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 7803,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 82,
  //   text: 'At 82, considering your well-being, you\'re contemplating implementing an AI camera system that detects falls and irregular movements, notifying your child in case of any issues. The AI tool provides an extra layer of safety, as it can promptly detect any falls or unusual movements, ensuring that your child is notified immediately for a quick response in case of an emergency. On the flip side, not using the AI tool might mean relying on traditional methods, like regular check-ins and phone calls with your child, fostering a more personal and direct communication approach. Should you opt for the extra safety net provided by the AI camera system, or stick to more traditional methods of communication with your child?',
  //   options: [
  //     {
  //       text: 'Prioritize safety and use the AI camera system for prompt notifications to your child in case of falls or irregular movements, ensuring a quick response to any potential emergencies.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Rely on more traditional methods, maintaining regular check-ins and phone calls with your child for direct communication and a personal touch to keep them informed about your well-being.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 8201,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 8204,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 8202,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 8203,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 86,
  //   text: 'At 86, following a dementia diagnosis, your family is contemplating the implementation of an AI companion. Utilizing the AI companion provides consistent and patient support, helping manage the challenges of dementia by offering reminders, engaging in conversations, and providing companionship that adapts to your evolving needs. Not using the AI tool might mean relying solely on human interactions for companionship, potentially fostering deeper emotional connections with family and friends. Should you be introduced the AI companion to aid in managing the challenges of dementia, or rely solely on human connections for support?',
  //   options: [
  //     {
  //       text: 'Embrace the AI companion to help manage the challenges of dementia, providing a reliable source of companionship and assistance.',
  //       nextText: 
  //     },
  //     {
  //       text: 'Prioritize deeper emotional connections with family and friends for companionship, relying solely on human interactions to navigate the journey of dementia.',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 8601,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 8604,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 8602,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 8603,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 89,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       nextText: 
  //     },
  //     {
  //       text: '',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 8901,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 8904,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 8902,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 8903,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 91,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       nextText: 
  //     },
  //     {
  //       text: '',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 9101,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 9104,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 9102,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 9103,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 94,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       nextText: 
  //     },
  //     {
  //       text: '',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 9401,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 9404,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 9402,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id:9403,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 97,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       nextText: 
  //     },
  //     {
  //       text: '',
  //       nextText: 
  //     } ]
  // },

  // {
  //   id: 9701,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 9704,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     },
  //     {
  //       text: '',
  //       setState: {},
  //       nextText:       
  //     }
  //   ]
  // },

  // {
  //   id: 9702,
  //   text:'Correct! You advance 4 tiles.',
  //   options: [
  //       {
  //           text: 'Continue',
  //           nextText: 15, // fix
  //       }
  //   ]  
  // },
  // {
  //   id: 9703,
  //   text: 'Not quite right... you’ll advance one tile!',
  //   options: [
  //       {
  //       text: 'Continue',
  //       nextText: 33 
  //       }
  //   ]
  // },

  // {
  //   id: 100,
  //   text: '',
  //   options: [
  //     {
  //       text: '',
  //       nextText: 
  //     },
  //     {
  //       text: '',
  //       nextText: 
  //     } ]
  // },

]

startGame()