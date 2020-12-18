const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'Terletak di manakah danau terbesar di Indonesia?',
        choice1: 'Danau Maninjau, Sumatera Barat',
        choice2: 'Danau Toba, Sumatera Utara',
        choice3: 'Danau Kelimutu, Flores',
        choice4: 'Danau Singkarak, Sumatera Barat6',
        answer: 2,
    },
    {
        question: "Sungai terpanjang di Indonesia adalah …",
        choice1: "Sungai Kapuas",
        choice2: "Sungai Digul",
        choice3: "Sungai Martapura",
        choice4: "Sungai Citarus",
        answer: 1,
    },
    {
        question: "Apakah gunung tertinggi yang ada di Indonesia?",
        choice1: "Sinabung",
        choice2: "Jayawijaya",
        choice3: "Mandala",
        choice4: "Trikora",
        answer: 2,
    },
    {
        question: "Daerah di Indonesia yang disebut sebagai paru-paru dunia adalah…?",
        choice1: "Papua",
        choice2: "Bali",
        choice3: "Madura",
        choice4: "Kalimantan",
        answer: 4,
    },
    {
        question: "Siapakah wakil presiden kita saat ini (2020)?",
        choice1: "Jusuf Kalla",
        choice2: "Prabowo Subianto",
        choice3: "Ma'aruf Amin",
        choice4: "Anies Baswedan",
        answer: 3,
    },
    {
        question: "Presiden negara Indonesia yang paling lama memimpin adalah presiden....",
        choice1: "Soekarno",
        choice2: "Soeharto",
        choice3: "Joko Widodo",
        choice4: "B.J Habibie",
        answer: 2,
    },
    {
        question: "Joglo adalah rumah adat dari provinsi ...",
        choice1: "Jawa Tengah",
        choice2: "Jawa Barat",
        choice3: "Kalimantan ",
        choice4: "Papua",
        answer: 4,
    },
    {
        question: "Kota Palu terletak di pulau…",
        choice1: "Jawa",
        choice2: "Sumatra",
        choice3: "Kalimantan",
        choice4: "Sulawesi",
        answer: 4,
    },
    {
        question: "Provinsi berikut ini terletak di pulau Sumatera, kecuali …",
        choice1: "Jambi",
        choice2: "Riau",
        choice3: "Gorontalo",
        choice4: "Lampung",
        answer: 3,
    },
    {
        question: "Berapakah jumlah provinsi di Indonesia saat ini?",
        choice1: "34",
        choice2: "33",
        choice3: "32",
        choice4: "31",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Pertanyaan ${questionCounter} dari ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()