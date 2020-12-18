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
        question: 'Manakah di antara pilihan berikut yang merupakan kata TIDAK baku?',
        choice1: 'Apotik',
        choice2: 'Imbauan',
        choice3: 'Zaman',
        choice4: 'Ijazah',
        answer: 1,
    },
    {
        question: "Manakah di antara pilihan berikut yang BUKAN merupakan sinonim dari kata abadi?",
        choice1: "Daim",
        choice2: "Kekal",
        choice3: "Langgeng",
        choice4: "Sementara",
        answer: 4,
    },
    {
        question: "Manakah di antara pilihan berikut yang merupakan sinonim dari kata mumpuni?",
        choice1: "Mahir",
        choice2: "Keren",
        choice3: "Bisa",
        choice4: "Sanggup",
        answer: 1,
    },
    {
        question: "Manakah di antara pilihan berikut yang merupakan kata TIDAK baku?",
        choice1: "Jenazah",
        choice2: "Isteri",
        choice3: "Cabai",
        choice4: "Cendekiawan",
        answer: 2,
    },
    {
        question: "Kemujuran artinya…",
        choice1: "Apes",
        choice2: "Banting tulang",
        choice3: "Berfoya ",
        choice4: "Keberuntungan",
        answer: 1,
    },
    {
        question: "Contoh dari kata predikat ialah…",
        choice1: "Dia",
        choice2: "Di rumah",
        choice3: "Memasak",
        choice4: "Bola",
        answer: 3,
    },
    {
        question: "Apakah arti dari peribahasa “Air beriak tanda tak dalam”?",
        choice1: "Bila sudah terlanjur terjadi, menyesal tidak ada gunanya",
        choice2: "Orang yang banyak cakap (sombong dan sebagainya), biasanya kurang ilmunya",
        choice3: "Sudah siap sedia segala keperluan untuk melakukan suatu pekerjaan",
        choice4: "Selalu berubah-ubah atau tidak tetap pendirian",
        answer: 3,
    },
    {
        question: " “Jenis puisi lama yang terdiri dari empat baris, di mana dalam setiap bait terdiri dari sampiran dan isi “merupakan pengertian dari…",
        choice1: "Pantun",
        choice2: "Puisi",
        choice3: "Gurindam",
        choice4: "Peribahasa",
        answer: 1,
    },
    {
        question: "Berikut merupakan jenis-jenis pantun, kecuali…",
        choice1: "Jenaka",
        choice2: "Teka-teki",
        choice3: "Anak-anak",
        choice4: "Politik",
        answer: 4,
    },
    {
        question: "“Di dunia ini tidak ada yang sempurna dan manusia tidak luput dari kesalahan” merupakan pengertian dari peribahasa…",
        choice1: "Karena nila setitik rusak susu sebelanga",
        choice2: "Ada udang di balik batu",
        choice3: "Sepandai-pandainya tupai melompat, sekali waktu jatuh juga",
        choice4: "Tong kosong nyaring bunyinya",
        answer: 3,
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