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
        text: 'Use AI',
        setState: { blueGoo: true },
        nextText: 101
      },
      {
        text: 'Leave the goo',
        nextText: 2
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
        nextText: 3
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
        nextText: 3
      }
    ]
  },
  {
    id: 401,
    text: 'As you eagerly requested another horse from the home assistant speaker, it misunderstood your innocent plea and actually initiated a purchase for a real horse online! This mistake caused unintended financial strain and logistical issues for your family, leading to an unexpected and challenging situation that required resolving the purchase and finding a suitable solution for the real horse, all stemming from a simple misunderstanding with the home assistant speaker.',
    options: [
        {
            text: 'By intentionally causing financial strain as part of its programming.',
            nextText: 403
        },
        {
            text: 'By initiating an online purchase based on a misunderstanding of the user\'s request.',
            nextText: 402
        },
        {
            text: 'By creating logistical issues to test the user\'s problem-solving skills.',
            nextText: 403
        },
        {
            text: 'By failing to understand the user\'s request and providing incorrect information.',
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
        nextText: 3 // fix
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
            nextText: 801 // make another object
        }
    ]
  },

  {
    id: 801,
    text: 'As you dive into the world of RoboBuddy, its AI marvel becomes evident. The toy uses artificial intelligence to adapt and respond to your commands, creating an interactive and dynamic playtime. The AI analyzes your preferences, adjusting the LED eye colors and tailoring its activities to match your interests.' 
    + 'It\'s like having a smart and responsive playmate that learns and grows with you, making every interaction with RoboBuddy a fascinating exploration of technology and fun.' 
    + '',
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
            nextText: 1101
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
            nextText: 1301
        }
    ]
  },

  {
    id: 1301,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 1302,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 1303,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },


  {
    id: 15,
    text: 'Age 15 : School\'s In! \n \n Frustrated after spending hours trying to solve equations, you remember hearing about an AI chatbot that offers tutoring assistance. You open the chat window for the AI tutoring service and type: "Hey there! I\'m struggling with algebra and could really use some help. Are you able to assist me with solving equations?" You eagerly await a response, anticipating that this technology might provide the guidance you need to grasp those tricky algebra concepts and complete your homework successfully. \n \n Quiz: Why did AI get us in such a bad place?',
    options: [
      {
        text: 'Seek help from the AI chatbot for algebra assistance, hoping it can provide the guidance needed to tackle the tricky equations.',
        nextText: 4
      },
      {
        text: 'Turn to a classmate or teacher for help with algebra, choosing human assistance over the AI chatbot.',
        nextText: 1501
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
    id: 1502,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 20,
        }
    ]  
  },
  { // incorrect answer
    id: 1503,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 3 // fix
        }
    ]
  },

  {
    id: 18,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 1801,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 1802,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 1803,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

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
        nextText: 5
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
        nextText: 3 // fix
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
            nextText: 2101
        }
    ]
  },

  {
    id: 2101,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 2102,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 2103,
    text: '',
    options: [
        {
            text: '',
            nextText:
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
        nextText: 1
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
    id: 2602,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 29,
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
        nextText: 0
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
    id: 2902,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 33, // fix
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
        nextText: 7
      },
      {
        text: 'Seek guidance from friends or family in creating your wedding vows and write them yourself.',
        nextText: 0
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
    id: 3302,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 50, // fix
        }
    ]  
   },
   {
    id: 3303,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 33 
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
            nextText:
        },
        {
            text: 'Stick to traditional methods for your entrepreneurial journey.',
            nextText:
        }
    ]
  },

  {
    id: 3501,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 3502,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 3503,
    text: '',
    options: [
        {
            text: '',
            nextText:
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
            nextText:
        },
        {
            text: 'Keep it old-school! Trust your gut and the paper map. Decide between AI ease or the charm of navigating your way home the classic way.',
            nextText:
        }
    ]
  },

  {
    id: 3801,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 3802,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 3803,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

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
            nextText:
        },
        {
            text: 'Opt for traditional methods, avoiding the potential ethical and privacy concerns associated with facial recognition AI and relying '
            + 'on established practices within the courtroom.',
            nextText:
        }
    ]
  },

  {
    id: 4001,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 4002,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 4003,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },


  {
    id: 42,
    text: 'At 42, managing family plans and finances, you\'re pondering the idea of bringing AI into the mix to make life a bit smoother—helping '
    +'with budgeting, suggesting wise investments, and generally taking some weight off your financial shoulders. The AI assistant could help by '
    + ' diving into your spending habits, recommending budget tweaks, and highlighting investment opportunities—a kind of digital assistant for your money matters. '
    + 'Without AI, family planning and financial management would rely on traditional methods, such as manual budgeting and periodic consultations '
    + 'with financial advisors, potentially missing out on real-time insights and personalized recommendations.',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 4201,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 4202,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 4203,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },


  {
    id: 45,
    text: 'At 45, grappling with a hectic schedule and grocery shopping demands, you contemplate employing AI to streamline your personal grocery '
    + 'shopping experience. The AI, acting as a smart shopping assistant, would analyze your dietary preferences, past purchase history, and '
    + 'current needs to generate a tailored shopping list, suggest recipe ideas, and even alert you to relevant discounts and promotions. '
    + 'Without AI, the alternative would involve manually creating shopping lists, navigating crowded grocery stores, and relying on memory or '
    + ' handwritten notes, potentially leading to oversights and less efficient shopping trips. Should you embrace AI to '
    + ' revolutionize your grocery shopping routine, leveraging its analytical capabilities, or stick to the traditional, hands-on approach?',
    options: [
        {
            text: 'Embrace the AI-powered shopping assistant for a more efficient and personalized grocery shopping experience, with tailored lists, '
            + 'recipe suggestions, and potential cost savings.',
            nextText:
        },
        {
            text: 'Stick to the traditional, hands-on approach of manual shopping lists and navigating the grocery store without the assistance of AI, preferring to handpick everything yourself.',
            nextText:
        }
    ]
  },

  {
    id: 4501,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 4502,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 4503,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 48,
    text: 'At 48, facing unpredictable weather patterns, you ponder the use of AI for weather forecasting to ensure dressing appropriately for the day ahead. '
    + 'The AI weather forecasting tool would analyze real-time weather data, considering factors like temperature, humidity, and precipitation, and '
    + 'provide personalized outfit recommendations to suit the day\'s conditions. Without AI, the alternative would involve relying on traditional '
    + 'weather forecasts from news sources or smartphone apps. Now, the decision is in your hands: Opt for AI\'s '
    + 'precision in weather forecasts or stick to the conventional approach?',
    options: [
        {
            text: 'Embrace the convenience of AI for accurate weather forecasts, ensuring you dress appropriately and stay prepared for changing weather '
            + 'conditions.',
            nextText:
        },
        {
            text: 'Stick with the familiarity of traditional weather methods, recognizing the occasional unpredictability, but maintaining a more hands-on '
            + 'and adaptive approach to dressing for the day.',
            nextText:
        }
    ]
  },

  {
    id: 4801,
    text: '',
    options: [
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        },
        {
            text: '',
            nextText:
        }
    ]

  },

  {
    id: 4802,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },

  {
    id: 4803,
    text: '',
    options: [
        {
            text: '',
            nextText:
        }
    ]
  },



  {
    id: 50,
    text: 'Age 50 : New Toy! \n \n On your 50th birthday, your family surprises you with a cutting-edge self-driving car, a gift that leaves you awestruck and excited. Eager to experience this revolutionary technology firsthand, you embark on a test drive with your loved ones. Amidst the thrill of witnessing the car\'s capabilities, you enjoy the freedom to relax and engage with your family, feeling like a passenger on an extraordinary journey. The car\'s sensors and AI algorithms seamlessly guide it through traffic, giving you a taste of the future of transportation.',
    options: [
      {
        text: 'Embrace the gift of a self-driving car, enjoying the thrill of a test drive guided by the car\'s sensors and AI algorithms.',
        nextText: 8
      },
      {
        text: 'Opt for traditional driving experiences, preferring to be in control without relying on self-driving technology for transportation.',
        nextText: 0
      }

    //   {
    //     text: 'Attack it with your sword',
    //     requiredState: (currentState) => currentState.sword,
    //     nextText: 9
    //   },
    //   {
    //     text: 'Hide behind your shield',
    //     requiredState: (currentState) => currentState.shield,
    //     nextText: 10
    //   },
    //   {
    //     text: 'Throw the blue goo at it',
    //     requiredState: (currentState) => currentState.blueGoo,
    //     nextText: 11
    //   }
    ]
  },
  {
    id: 5001,
    text: 'However, during your test drive, a mishap occurs when the self-driving car\'s AI mistakenly identifies a truck, resulting in a collision. You experience the shock and impact of the accident, sustaining terrible injuries due to the collision caused by the AI\'s misinterpretation. The accident prompts a reassessment of the technology\'s safety and highlights the necessity for further advancements and stringent safety protocols in self-driving vehicles. \n \n Quiz: Why did AI get us in such a bad place?',
    options: [
      {
        text: 'By intentionally causing accidents to test the user\'s reaction and coping skills.',
        nextText: 5003
      },
      {
        text: ' By accidentally misidentifying a truck, leading to a collision and causing injuries.',
        nextText: 5002
      },
      {
        text: 'By suggesting unsafe driving practices to challenge the user\'s decision-making abilities.',
        nextText: 5003
      },
      {
        text: 'By purposely ignoring safety protocols to evaluate the user\'s response in emergency situations.',
        nextText: 5003
      }
    ]
  },
  {
    id: 5002,
    text:'Correct! You advance 4 tiles.',
    options: [
        {
            text: 'Continue',
            nextText: 15, // fix
        }
    ]  
  },
  {
    id: 5003,
    text: 'Not quite right... you’ll advance one tile!',
    options: [
        {
        text: 'Continue',
        nextText: 33 
        }
    ]
  },

  {
    id: 53,
    text: 'At 53, thinking about simplifying life at home, you\'re mulling over the idea of bringing in some smart house AI magic. The smart house AI '
    + 'would serve as a digital home manager, automating tasks like adjusting lighting, controlling thermostats, and monitoring security, '
    + 'offering convenience and personalized settings tailored to your daily routines. On the flip side, without the AI, it\'s back to doing things the old-school '
    + 'way and staying in control – manually adjusting settings and keeping an eye on everything. Should you welcome smart house AI into your home, streamlining '
    + 'tasks and enhancing convenience, or stick to the traditional, hands-on approach to home management?',
    options: [
      {
        text: 'Dive into the future of home management by embracing smart house AI, letting it handle tasks like lights, temperature, and security for a more automated and convenient living experience.',
        nextText: 
      },
      {
        text: 'Stick to the familiar routine of manually managing home tasks without AI, maintaining a hands-on approach to home management.',
        nextText: 
      } ]
  },

  {
    id: 55,
    text: 'At 55, with security in mind, you find yourself pondering the adoption of AI for personal security and smart surveillance. The AI-driven security system would '
    + 'act as a vigilant guardian, using facial recognition, motion detection, and smart surveillance to enhance home security, providing real-time alerts and maintaining a watchful '
    + 'eye on your property. On the flip side, without implementing AI, you would rely on traditional security measures, such as manual surveillance, alarms, and locks. '
    + 'Should you embrace AI for an elevated level of personal security and surveillance, or stick to conventional methods for safeguarding your home?',
    options: [
      {
        text: 'Embrace the advanced security features of AI, fortifying your home with facial recognition, motion detection, and smart surveillance for a vigilant and real-time security system.',
        nextText: 
      },
      {
        text: 'Stick to traditional security measures, relying on manual surveillance, alarms, and locks without the integration of AI, maintaining a more conventional approach to home security.',
        nextText: 
      } ]
  },
  
  {
    id: 57,
    text: 'At 57, venturing into a new business endeavor, you contemplate the use of AI to streamline the hiring process and sift through resumes for your upcoming company. '
    + 'The AI recruitment tool would analyze resumes using advanced algorithms, identifying relevant skills, experiences, and qualifications, providing a more efficient and '
    + 'data-driven approach to shortlisting candidates. Without AI, the process leans on human judgment, offering a more personalized touch and a greater focus on assessing soft '
    + 'skills and cultural fit. Should you leverage AI to enhance the efficiency and objectivity of your hiring process, or stick to traditional methods to have a more personal '
    + 'selection of your employees?',
    options: [
      {
        text: 'Utilize AI for streamlined efficiency in resume analysis and data-driven hiring decisions.',
        nextText: 
      },
      {
        text: 'Embrace a personal touch without AI, relying on human judgment for a more personalized hiring approach.',
        nextText: 
      } ]
  },

  {
    id: 60,
    text: 'Turning 60 and gearing up for your big birthday bash, you\'re pondering whether to let AI handle the invites. Picture this: AI making life easier '
    + 'by sorting contacts, crafting personalized invites, and keeping track of RSVPs, making the whole birthday shindig a breeze. But, hey, not using AI could mean '
    + 'going old school – personalizing each invite by hand, giving them a special touch and creating an intimate vibe for the celebration. What suits your vision for your 60th birthday party?',
    options: [
      {
        text: 'Let AI do its thing, handling invites and RSVPs for a stress-free birthday party setup.',
        nextText: 
      },
      {
        text: 'Go for the personal touch, crafting each invite by hand and adding a unique flair to make your celebration extra special.',
        nextText: 
      } ]
  },

  {
    id: 62,
    text: 'At 62, facing potential fraud in a mobile payment service app, you\'re pondering whether to use AI to address the situation. Using an AI chatbot, you could '
    + 'streamline the process by quickly interacting to investigate and potentially recover the money lost due to fraud. On the flip side, opting not to use AI might '
    + 'involve a more traditional approach, such as speaking to a human representative on the phone to address and resolve the fraud issue.',
    options: [
      {
        text: 'Use the AI chatbot to swiftly investigate and potentially recover the money lost due to fraud in the mobile payment service app.',
        nextText: 
      },
      {
        text: 'Opt for a human touch by speaking to a representative on the phone, addressing the fraud issue in a more traditional and personalized manner.',
        nextText: 
      } ]
  },

  {
    id: 65,
    text: 'At 65, thinking about keeping tabs on your health, you\'re weighing the idea of using AI for some personalized health advice.Picture this: Using a cool AI health tracker, like a chatbot, to get real-time tips, track your health stuff, and maybe pick up some insights along the way. On the flip side, skipping the AI might mean doing it old school – chatting with a human on the phone, getting personalized health advice, the classic way. Now, the real talk: Do you go with the tech-savvy AI for hassle-free health tracking, or stick to the good chat with a human for that personal touch?',
    options: [
      {
        text: 'Roll with the AI health tracker, getting those real-time tips and personalized insights for an easy-breezy health journey.',
        nextText: 
      },
      {
        text: 'Keep it classic, dial up a human on the phone for that personalized health advice and guidance.',
        nextText: 
      } ]
  },

  {
    id: 68,
    text: 'At 68, eyeing goodies for your new grandkids, you\'re weighing the option of using AI recommendations on a shopping app. Picture this: Glancing at AI-suggested purchases, letting the smart algorithms guide your choices for age-appropriate gifts and possibly snagging some discounts in the process. On the flip side, steering clear of AI might mean going the traditional route – having a chat with a human on the phone, seeking advice, and making purchases with a personal touch. Now, the question on the table: Should you trust the AI for a tech-savvy shopping spree, or keep it classic with a more human-centric approach?',
    options: [
      {
        text: 'Dive into the digital realm, relying on AI-recommended purchases for a quick and efficient shopping spree, ensuring you pick out the perfect gifts for your grandkids.',
        nextText: 
      },
      {
        text: 'Stick with the tried-and-true method, have a chat with a human on the phone, getting personalized advice and recommendations for a more traditional and hands-on approach to spoil your new grandkids. ',
        nextText: 
      } ]
  },

  {
    id: 70,
    text: 'At 70, eager to enhance joint well-being, you\'re mulling over the prospect of employing AI to curate a novel fitness regimen. Enlisting AI assistance to devise a customized exercise plan that takes into account your joint health, fitness level, and preferences could deliver a tailored and efficient approach. Bypassing the AI route, however, might involve a more conventional avenue – engaging in a dialogue with a fitness expert over the phone, seeking advice, and formulating a workout plan with a personalized touch. Should you let AI steer the ship for a cutting-edge and personalized fitness plan, or adhere to a more hands-on approach?',
    options: [
      {
        text: 'Dive into the tech realm, harness AI to design a bespoke workout plan tailored to your joint health and fitness objectives, ensuring an efficient and customized exercise routine.',
        nextText: 
      },
      {
        text: 'Have a chat with a fitness expert over the phone, obtaining personalized advice and constructing a personalized and age-appropriate workout plan.',
        nextText: 
      } ]
  },

  {
    id: 73,
    text: 'At 73, contemplating a trip to the doctor\'s, you\'re weighing the option of using a self-driving car taxi. Opting for a self-driving car taxi, guided by AI, to effortlessly navigate the journey to your doctor\'s appointment can provide convenience and a quiet travel experience. On the flip side, ordering a human-driven taxi might involve having a nice conversation with another person and effective communication with the driver about your journey. Should you embrace the convenience of a self-driving car taxi for a hassle-free trip to the doctor, or take the chance to have a pleasant ride with a real driver?',
    options: [
      {
        text: 'Dive into the future, hop on the self-driving car taxi for a convenient and hands-free journey to your doctor\'s appointment, enjoying the benefits of automated transportation.',
        nextText: 
      },
      {
        text: 'Keep it classic, engage in a conversation with a human on the phone, arrange transportation, and have a human driver navigate the journey to your doctor\'s appointment.',
        nextText: 
      } ]
  },

  {
    id: 75,
    text: 'At 75, you receive a call from the President, who urgently needs your support and requests a $500 contribution to his campaign. In the call, the president sounds convincing and asks for your debit card information to process the donation promptly. Considering the alternative, you might wonder about the legitimacy of the call, asking how he got your number, and insisting that you could contribute later through his official campaign website, ensuring a secure and verified transaction. Should you provide your debit card information over the phone for the President, or take a more cautious approach?',
    options: [
      {
        text: 'Refrain from providing debit card information over the phone, and instead opt to contribute later through the President\'s official campaign website',
        nextText: 
      },
      {
        text: 'Abide by the President\'s wishes and give your debit card information to support his campaign.',
        nextText: 
      } ]
  },

  {
    id: 77,
    text: 'At 77, facing a new diagnosis, you\'re contemplating the use of an AI tool that recommends medication. Using the AI tool could offer quick and efficient recommendations, taking into account vast medical databases and emerging research, providing a potentially comprehensive and up-to-date analysis. On the other hand, consulting a doctor personally provides the benefits of a human touch, personalized care, and the ability to discuss the diagnosis and treatment options in-depth, fostering a deeper understanding of your health. Should you rely on the AI tool for medication recommendations, or opt for the personal touch of consulting a doctor?',
    options: [
      {
        text: 'Embrace the tech-savvy approach, use the AI tool for efficient medication recommendations based on extensive data and research, ensuring a quick and potentially comprehensive analysis.',
        nextText: 
      },
      {
        text: 'Keep it personal, consult a doctor in person for a human-centric approach, receiving personalized care, the opportunity for in-depth discussions, and a deeper understanding of your health in the face of a new diagnosis.',
        nextText: 
      } ]
  },

  {
    id: 78,
    text: 'At 78, feeling a chill at home, you\'re contemplating using an AI smart home voice assistant to increase the temperature. Using the AI tool allows you to effortlessly control the temperature, providing convenience and independence, especially when you might not want to bother your grandkid for a simple task. On the flip side, asking your grandkid to adjust the temperature will make sure you are heard correctly and get the chance to chat with your darling! Should you use the AI smart home assistant for a quick temperature adjustment, or opt for asking your grandkid?',
    options: [
      {
        text: 'Embrace the convenience of AI, use the smart home voice assistant to effortlessly increase the temperature, ensuring independence and convenience.',
        nextText: 
      },
      {
        text: 'Keep it personal, ask your grandkid for assistance in adjusting the temperature, fostering a sense of connection and giving them the opportunity to help.',
        nextText: 
      } ]
  },

  {
    id: 82,
    text: 'At 82, considering your well-being, you\'re contemplating implementing an AI camera system that detects falls and irregular movements, notifying your child in case of any issues. The AI tool provides an extra layer of safety, as it can promptly detect any falls or unusual movements, ensuring that your child is notified immediately for a quick response in case of an emergency. On the flip side, not using the AI tool might mean relying on traditional methods, like regular check-ins and phone calls with your child, fostering a more personal and direct communication approach. Should you opt for the extra safety net provided by the AI camera system, or stick to more traditional methods of communication with your child?',
    options: [
      {
        text: 'Prioritize safety and use the AI camera system for prompt notifications to your child in case of falls or irregular movements, ensuring a quick response to any potential emergencies.',
        nextText: 
      },
      {
        text: 'Rely on more traditional methods, maintaining regular check-ins and phone calls with your child for direct communication and a personal touch to keep them informed about your well-being.',
        nextText: 
      } ]
  },

  {
    id: 86,
    text: 'At 86, following a dementia diagnosis, your family is contemplating the implementation of an AI companion. Utilizing the AI companion provides consistent and patient support, helping manage the challenges of dementia by offering reminders, engaging in conversations, and providing companionship that adapts to your evolving needs. Not using the AI tool might mean relying solely on human interactions for companionship, potentially fostering deeper emotional connections with family and friends. Should you be introduced the AI companion to aid in managing the challenges of dementia, or rely solely on human connections for support?',
    options: [
      {
        text: 'Embrace the AI companion to help manage the challenges of dementia, providing a reliable source of companionship and assistance.',
        nextText: 
      },
      {
        text: 'Prioritize deeper emotional connections with family and friends for companionship, relying solely on human interactions to navigate the journey of dementia.',
        nextText: 
      } ]
  },

  {
    id: 89,
    text: '',
    options: [
      {
        text: '',
        nextText: 
      },
      {
        text: '',
        nextText: 
      } ]
  },

  {
    id: 91,
    text: '',
    options: [
      {
        text: '',
        nextText: 
      },
      {
        text: '',
        nextText: 
      } ]
  },

  {
    id: 94,
    text: '',
    options: [
      {
        text: '',
        nextText: 
      },
      {
        text: '',
        nextText: 
      } ]
  },

  {
    id: 97,
    text: '',
    options: [
      {
        text: '',
        nextText: 
      },
      {
        text: '',
        nextText: 
      } ]
  },

  {
    id: 100,
    text: '',
    options: [
      {
        text: '',
        nextText: 
      },
      {
        text: '',
        nextText: 
      } ]
  },




]

startGame()