const profile = {
  "aboutMe": {
    "heading": "Hello, My name is Daniel!",
    "text": "I'm an incoming Senior at UC San Diego studying Computer Science with " +
      "a minor in Math. I'm currently interning at Facebook as a Software Engineer " +
      "working on the Facebook Events product.\n\n" +
      "My primary interests are in Computer Networks and Security and I hope to " +
      "be able to work in the field some day. In my free time, I develop mobile apps " +
      "and websites such as my portfolio since I find it very enjoyable to create " +
      "something that you could directly experience.\n\n" +
      "What I look for in a job is the ability to make an impact. I'm motivated " +
      "by the fact that I could create something that can bring benefits to " +
      "the society. I will be graduating in June 2020 and looking toward a full time " +
      "opportunities in Software Engineering.",
  },
  "workExperience":  {
    objs: {
      0: {
        name: "Facebook",
        title: "Software Engineering Intern",
        date: "June 2019 - September 2019",
        description: "Working on the Events Distribution team.",
        techUsed: "Python, Presto/Hive",
        logo: "assets/facebook_logo_text.png"
      },
      1: {
        name: "Teradata",
        title: "Software Engineering Intern",
        date: "June 2018 - September 2018",
        description: "Created a dashboard that displays metrics such as Memory Usage, Paging Activity, Jenkins Jobs’ " +
          "statuses, and active docker containers.\n\n" +
          "Wrote API integration tests for Cloud features (Teradata's Customer Database Console) to ensure quality of " +
          "Production application. These features include but not limited to changing instance types, scaling the number of " +
          "EC2 instances, and expanding storage.\n\n" +
          "Wrote Bash script for sanity check and automatic Jenkins build deployment and running when a PR is merged.\n\n" +
          "Used Terraform to deploy an AutoTag system (open source project) to tag AWS resources created with the owner’s" +
          "names.\n\n" +
          "Wrote an add-on to the open source project for listening to AWS Cloud Trail’s logs for Lambda Create event in " +
          "order to tag the Lambda function upon creation.\n",
        techUsed: "Ruby Sinatra, Dashing, Docker, REST, Jenkins, Prometheus, AWS\n",
        logo: "assets/teradata_logo_text.png"
      },
    },
    heading: "Work Experience",
    text: "I've been fortunate to have interned at two companies during my " +
      "time in college. These internships have helped me tremendously in " +
      "progressing my industry experience.\n" +
      "Click on the logos to find more about my experience."
  },
  "projects": {
    objs: {
      0: {
        title: "Code Style Linter",
        shortDesc: "A style linter for C and ARM Assembly files.",
        longDesc: "The style linter is capable of checking many things ranging from indentations, \"Magic\" numbers, lines" +
          " over 80 characters, and some more. \n\n I developed this to make my life easier grading students' " +
          "programming assignments, where I had to check if their code followed the style guidelines.",
        techUsed: "Python",
        repo: "https://github.com/hnguyen0428/style_checker",
        date: "April 2019",
        demoLink: null,
        hasDemo: false,
        medias: null,
        mediaDescriptions: [],
        mediaTypes: []
      },
      1: {
        title: "CodeSnippler",
        shortDesc: "A website for quickly looking up common code snippets in " +
          "order to assist with the developing process.",
        longDesc: "I developed the back end using Spring, which hosts a REST service that acts as a proxy between the front end " +
          "and the database. The Spring server handles everything from CRUD operations to complex queries such as those " +
          "used to query the popular snippets.\n\n" +
          "The front end is a web application, which is made using React. It allows users to do things such as creating " +
          "code snippets, saving code snippets for future lookups, and filtering the languages that they see in their " +
          "feed.",
        techUsed: "React Spring MongoDB",
        repo: "https://github.com/hnguyen0428/code-snippler",
        date: "September 2018",
        demoLink: "https://code-snippler.herokuapp.com",
        hasDemo: false,
        medias: null,
        mediaDescriptions: [],
        mediaTypes: []
      },
      2: {
        title: "GroupPlanner",
        shortDesc: "An iOS application that helps you find the appropriate time to hang out with your " +
          "friends.",
        longDesc: "GroupPlanner is an iOS application created as part of the CodePath bootcamp " +
          "project. The app uses Google Calendar API in order to pull users' events and overlay them on top of a calendar " +
          "view.\n\n" +
          "I also implemented an algorithm that would calculate available times of all users' in a group and display " +
          "them to make it easier for users to know when their friends are free.\n\n" +
          "Won CodePath Best in Show and Best App Idea award.",
        techUsed: "Swift OAuth Parse",
        repo: "https://github.com/hecs-software/group-planner",
        date: "May 2018",
        demoLink: null,
        hasDemo: true,
        medias: [
          "assets/demos/groupplanner/mycalendar.PNG",
          "assets/demos/groupplanner/grouplist.PNG",
          "assets/demos/groupplanner/createnewgroup.PNG",
          "assets/demos/groupplanner/groupcalendar.PNG",
          "assets/demos/groupplanner/timematcher.PNG"
        ],
        mediaDescriptions: [
          'Google Calendar of the logged in user with the events pulled from Google API',
          'This page shows all the groups that the user is currently in. From this page, the user can press the + sign to ' +
          'create a new group or view the group details by clicking on one of the groups.',
          'To create a group, the user simply decides a name and has the option to invite their friends now or later.',
          'This is the group calendar where all users\' events inside the group are pulled and displayed. The event details ' +
          'are hidden and only displayed as shaded. The user can toggle which users\' events to display by tapping on their ' +
          'profile pictures at the bottom. From here, the user can tap on the top right icon to go to the time matcher.',
          'In the time matcher, the user can see what time everyone is available by looking at the green shaded area. ' +
          'Again, the user can toggle which users to include in the time matching by toggling them at the bottom.'
        ],
        mediaTypes: [
          'image',
          'image',
          'image',
          'image',
          'image'
        ]
      },
      3: {
        title: "GuitarTuner",
        shortDesc: "An iOS application that can be used to tune the guitar.",
        longDesc: "GuitarTuner was developed as a tool to help users tune their guitar with more than " +
          "just the standard tuning.\n\n" +
          "I used Apple's Accelerate framework to perform Fast Fourier Transform along with applying a second-order filter " +
          "on the audio signal captured by the phone in order to determine the frequency of the note being played.\n",
        techUsed: "Swift",
        repo: "https://github.com/hnguyen0428/GuitarTuner",
        date: "December 2017",
        demoLink: null,
        hasDemo: true,
        medias: [
          "assets/demos/guitartuner/homepage.PNG",
          "assets/demos/guitartuner/GuitarTunerDemo.mov",
        ],
        mediaDescriptions: [
          'This is the front page of the app, which shows all the supported types of tuning.',
          'Once the user starts tuning, they can pick which string to tune and plays the string. The microphone will pick ' +
          'up the tone and calculate the frequency and determine whether the string is in tune. The meter will appear ' +
          'green once the string is in tune.'
        ],
        mediaTypes: [
          'image',
          'video'
        ]
      },
    },
    heading: "Some Projects I've Worked On",
    text: "These are the projects I've created in my free time while in college. " +
      "I had a lot of fun developing these projects and it is mainly through these projects " +
      "that I've initially gained the knowledge required for industry work.",
  },
  "education": {
    "school": "UC San Diego",
    "major": "BS Computer Science",
    "gradDate": "2020",
    "gpa": "3.78",
    "organizations": "Eta Kappa Nu, Computer Science Engineering Society",
    "description": "At UC San Diego, I serve as a tutor for the CSE department. " +
      "My responsibility includes grading assignments, holding lab hours to help students debug " +
      "their programming assignments, and holding quiz reviews and discussions. " +
      "I have tutored for CSE 11: Intro to Object Oriented Programming, and CSE 30: Systems " +
      "Programming (using C and ARM Assembly).",
    "courses": [
      {
        "courseName": "Computer Networks",
        "courseDesc": "Course covers topics on computer networks architecture, current internet " +
          "standards, routing and congestion controls, and transport protocols.\n" +
          "Projects include creating a Sliding-Window-Protocol in order to send and receive packets with " +
          "error detection, and creating a router, which handles receiving packets and forwarding packets to their " +
          "destinations."
      },
      {
        "courseName": "Computer Security",
        "courseDesc": "Course covers topics on computer security such as low-level software security, " +
          "cryptography, web security, networks security, hardware security, side channels, and computer " +
          "virus/malware.\n" +
          "Two major projects include replicating a buffer overflow exploit and a man-in-the-middle attack " +
          "that injects iframes into http packets."
      },
      {
        "courseName": "Computer Vision",
        "courseDesc": "Course covers topics in computer vision such as photometric stereo, binary image " +
          "processing, image filtering, edge detection, and object tracking."
      },
      {
        "courseName": "Deep Learning",
        "courseDesc": "Course covers neural networks topics such as perceptron learning, vanilla neural " +
          "networks, convolutional neural networks, recurrent neural networks, reinforcement learning and " +
          "generative adversarial networks. It also covers machine learning techniques such as " +
          "gradient descent, regressions, and maximum likelihood.\n" +
          "One of the projects I did was creating a CNN that trains on a set of Xray data in order to " +
          "classify what diseases the patient has. Another project is where I created a recurrent neural " +
          "network (LSTM to be specific) and trains it on a beer reviews dataset in order to then generate " +
          "similar beer reviews based on a given rating and beer category.\n" +
          "These two projects were done using PyTorch."
      },
      {
        "courseName": "Digital Systems Laboratory",
        "courseDesc": "Course covers programming system simulations using Verilog."
      },
      {
        "courseName": "Natural Language Processing",
        "courseDesc": "Course covers NLP topics such as language semantics, text prediction, smoothing " +
          "techniques (Katz Backoff, Kneser-Ney), sentiment classification with logistic regression, machine " +
          "translation using IBM model.\n" +
          "Projects include designing an n-gram probabilistic text generation model, a sentiment classification " +
          "model of Yelp reviews, Gene sequence tagging using Hidden Markov Model, and alignment model between " +
          "English and Spanish text."
      },
      {
        "courseName": "Object Oriented Programming",
        "courseDesc": "Course covers OOP concepts in Java."
      },
      {
        "courseName": "Programming Languages Paradigm",
        "courseDesc": "Course covers functional programming using Haskell. Projects include developing a " +
          "fully functional language, which involves creating a Lexer, Parser, and an interpreter."
      },
      {
        "courseName": "Recommenders System",
        "courseDesc": "Course covers basic machine learning methods such as Linear Regression, Logistic " +
          "Regression, SVM, and also various techniques on how to design recommender systems\n" +
          "Projects include designing rating model, category prediction model, and purchase prediction model " +
          "using sklearn library."
      },
      {
        "courseName": "Software Engineering",
        "courseDesc": "Course covers software engineering design patterns and best practices. We also worked on " +
          "a quarter-long project, working in a group of 10 people following Agile development."
      },
      {
        "courseName": "Systems Programming",
        "courseDesc": "Course covers low-level C and Assembly programming in ARM architecture."
      },
    ]
  },
  "resumeLink": "https://drive.google.com/open?id=1jxLAQ1ZC5Ie_IHezqILVmoj9YjOW2YuJ",
  "fbLink": "https://www.facebook.com/hnguyen0428",
  "githubLink": "https://github.com/hnguyen0428?tab=repositories",
  "linkedinLink": "https://www.linkedin.com/in/hnguyen0428",
  "profileImage": "assets/profile_picture.jpg",
  "email": "hnguyen0428@gmail.com",
};

export default profile;