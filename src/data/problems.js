export const problems = [
    {
        id: 1, 
        title: 'Novozymes Enzyme Stability Prediction',
        group: 'Supervisors',
        subgroup: 'Regression',
        description: 'Enzymes are proteins that act as catalysts in the chemical reactions of living organisms. The goal of this competition is to predict the thermostability of enzyme variants. The experimentally measured thermostability (melting temperature) data includes natural sequences, as well as engineered sequences with single or multiple mutations upon the natural sequences. Understanding and accurately predict protein stability is a fundamental problem in biotechnology. Its applications include enzyme engineering for addressing the world’s challenges in sustainability, carbon neutrality and more. Improvements to enzyme stability could lower costs and increase the speed scientists can iterate on concepts.',
        inputDescription: 'Each seq_id represents a single-mutation variant of an enzyme. Your task is to rank the stability of these variants, assigning greater ranks to more stable variants.',
        outputDescription: 'For each seq_id in the test set, you must predict the value for for the target tm.',
        submit: 5
    },
    {
        id: 2, 
        title: 'Predict Future Sales',
        group: 'Supervisors',
        subgroup: 'Regression',
        description: 'In this competition you will work with a challenging time-series dataset consisting of daily sales data, kindly provided by one of the largest Russian software firms - 1C Company. We are asking you to predict total sales for every product and store in the next month. By solving this competition you will be able to apply and enhance your data science skills.',
        inputDescription: 'Submissions are evaluated by root mean squared error (RMSE). True target values are clipped into [0,20] range.',
        outputDescription: 'For each id in the test set, you must predict a total number of sales.',
        submit: 10
    },
    {
        id: 3, 
        title: 'Digit Recognizer',
        group: 'Supervisors',
        subgroup: 'Classification',
        description: 'MNIST ("Modified National Institute of Standards and Technology") is the de facto “hello world” dataset of computer vision. Since its release in 1999, this classic dataset of handwritten images has served as the basis for benchmarking classification algorithms. As new machine learning techniques emerge, MNIST remains a reliable resource for researchers and learners alike. In this competition, your goal is to correctly identify digits from a dataset of tens of thousands of handwritten images. We’ve curated a set of tutorial-style kernels which cover everything from regression to neural networks. We encourage you to experiment with different algorithms to learn first-hand what works well and how techniques compare.',
        inputDescription: 'An image of a handwritten single digit',
        outputDescription: 'The goal in this competition is to take an image of a handwritten single digit, and determine what that digit is. For every in the test set, you should predict the correct label.',
        submit: 8
    },
    {
        id: 4, 
        title: 'House Prices - Advanced Regression Techniques',
        group: 'Supervisors',
        subgroup: 'Regression',
        description: "Ask a home buyer to describe their dream house, and they probably won't begin with the height of the basement ceiling or the proximity to an east-west railroad. But this playground competition's dataset proves that much more influences price negotiations than the number of bedrooms or a white-picket fence. With 79 explanatory variables describing (almost) every aspect of residential homes in Ames, Iowa, this competition challenges you to predict the final price of each home.",
        inputDescription: 'Submissions are evaluated on Root-Mean-Squared-Error (RMSE) between the logarithm of the predicted value and the logarithm of the observed sales price. (Taking logs means that errors in predicting expensive houses and cheap houses will affect the result equally.)',
        outputDescription: 'It is your job to predict the sales price for each house. For each Id in the test set, you must predict the value of the SalePrice variable. ',
        submit: 3
    },
    {
        id: 5, 
        title: 'Natural Language Processing with Disaster Tweets',
        group: 'Supervisors',
        subgroup: 'Regression',
        description: 'Twitter has become an important communication channel in times of emergency. The ubiquitousness of smartphones enables people to announce an emergency they’re observing in real-time. Because of this, more agencies are interested in programatically monitoring Twitter (i.e. disaster relief organizations and news agencies). But, it’s not always clear whether a person’s words are actually announcing a disaster. ',
        inputDescription: 'Submissions are evaluated using F1 between the predicted and expected answers.',
        outputDescription: 'For each ID in the test set, you must predict 1 if the tweet is describing a real disaster, and 0 otherwise. ',
        submit: 6
    },
    {
        id: 6, 
        title: 'Petals to the Metal - Flower Classification on TPU',
        group: 'Unsupervisors',
        subgroup: 'Classification',
        description: 'It’s difficult to fathom just how vast and diverse our natural world is. There are over 5,000 species of mammals, 10,000 species of birds, 30,000 species of fish – and astonishingly, over 400,000 different types of flowers.In this competition, you’re challenged to build a machine learning model that identifies the type of flowers in a dataset of images (for simplicity, we’re sticking to just over 100 types).',
        inputDescription: 'Submissions are evaluated on macro F1 score.',
        outputDescription: 'For each id in the test set, you must predict a type of flower (or label).',
        submit: 10
    },
    {
        id: 7, 
        title: 'Novozymes Enzyme Stability Prediction',
        group: 'Supervisors',
        subgroup: 'Regression',
        description: 'Enzymes are proteins that act as catalysts in the chemical reactions of living organisms. The goal of this competition is to predict the thermostability of enzyme variants. The experimentally measured thermostability (melting temperature) data includes natural sequences, as well as engineered sequences with single or multiple mutations upon the natural sequences. Understanding and accurately predict protein stability is a fundamental problem in biotechnology. Its applications include enzyme engineering for addressing the world’s challenges in sustainability, carbon neutrality and more. Improvements to enzyme stability could lower costs and increase the speed scientists can iterate on concepts.',
        inputDescription: 'Each seq_id represents a single-mutation variant of an enzyme. Your task is to rank the stability of these variants, assigning greater ranks to more stable variants.',
        outputDescription: 'For each seq_id in the test set, you must predict the value for for the target tm.',
        submit: 5
    },
    {
        id: 8, 
        title: 'Predict Future Sales',
        group: 'Unsupervisors',
        subgroup: 'Regression',
        description: 'In this competition you will work with a challenging time-series dataset consisting of daily sales data, kindly provided by one of the largest Russian software firms - 1C Company. We are asking you to predict total sales for every product and store in the next month. By solving this competition you will be able to apply and enhance your data science skills.',
        inputDescription: 'Submissions are evaluated by root mean squared error (RMSE). True target values are clipped into [0,20] range.',
        outputDescription: 'For each id in the test set, you must predict a total number of sales.',
        submit: 10
    },
    {
        id: 9, 
        title: 'Digit Recognizer',
        group: 'Supervisors',
        subgroup: 'Classification',
        description: 'MNIST ("Modified National Institute of Standards and Technology") is the de facto “hello world” dataset of computer vision. Since its release in 1999, this classic dataset of handwritten images has served as the basis for benchmarking classification algorithms. As new machine learning techniques emerge, MNIST remains a reliable resource for researchers and learners alike. In this competition, your goal is to correctly identify digits from a dataset of tens of thousands of handwritten images. We’ve curated a set of tutorial-style kernels which cover everything from regression to neural networks. We encourage you to experiment with different algorithms to learn first-hand what works well and how techniques compare.',
        inputDescription: 'An image of a handwritten single digit',
        outputDescription: 'The goal in this competition is to take an image of a handwritten single digit, and determine what that digit is. For every in the test set, you should predict the correct label.',
        submit: 8
    },
    {
        id: 10, 
        title: 'House Prices - Advanced Regression Techniques',
        group: 'Supervisors',
        subgroup: 'Regression',
        description: "Ask a home buyer to describe their dream house, and they probably won't begin with the height of the basement ceiling or the proximity to an east-west railroad. But this playground competition's dataset proves that much more influences price negotiations than the number of bedrooms or a white-picket fence. With 79 explanatory variables describing (almost) every aspect of residential homes in Ames, Iowa, this competition challenges you to predict the final price of each home.",
        inputDescription: 'Submissions are evaluated on Root-Mean-Squared-Error (RMSE) between the logarithm of the predicted value and the logarithm of the observed sales price. (Taking logs means that errors in predicting expensive houses and cheap houses will affect the result equally.)',
        outputDescription: 'It is your job to predict the sales price for each house. For each Id in the test set, you must predict the value of the SalePrice variable. ',
        submit: 3
    },
    {
        id: 11, 
        title: 'Natural Language Processing with Disaster Tweets',
        group: 'Unsupervisors',
        subgroup: 'Regression',
        description: 'Twitter has become an important communication channel in times of emergency. The ubiquitousness of smartphones enables people to announce an emergency they’re observing in real-time. Because of this, more agencies are interested in programatically monitoring Twitter (i.e. disaster relief organizations and news agencies). But, it’s not always clear whether a person’s words are actually announcing a disaster. ',
        inputDescription: 'Submissions are evaluated using F1 between the predicted and expected answers.',
        outputDescription: 'For each ID in the test set, you must predict 1 if the tweet is describing a real disaster, and 0 otherwise. ',
        submit: 6
    },
    {
        id: 12, 
        title: 'Petals to the Metal - Flower Classification on TPU',
        group: 'Supervisors',
        subgroup: 'Classification',
        description: 'It’s difficult to fathom just how vast and diverse our natural world is. There are over 5,000 species of mammals, 10,000 species of birds, 30,000 species of fish – and astonishingly, over 400,000 different types of flowers.In this competition, you’re challenged to build a machine learning model that identifies the type of flowers in a dataset of images (for simplicity, we’re sticking to just over 100 types).',
        inputDescription: 'Submissions are evaluated on macro F1 score.',
        outputDescription: 'For each id in the test set, you must predict a type of flower (or label).',
        submit: 10
    },
];