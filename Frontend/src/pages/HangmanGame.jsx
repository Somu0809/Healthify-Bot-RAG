import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, XCircle } from "lucide-react"; // Remove RefreshCw
import { useNavigate } from "react-router-dom";

const wordList = [
    // Nature and Landscape Words
    "OCEAN", "CLOUD", "BLOSSOM", "RIVER", "MOUNTAIN", 
    "MEADOW", "BREEZE", "LANTERN", "GARDEN", "RAINBOW",
    "SILENCE", "MOONLIGHT", "STARLIGHT", "WHISPER", "SUNRISE",
    "SAND", "FEATHER", "ECHO", "LOTUS", "WAVES",
    "TRANQUIL", "ZEN", "HORIZON", "CANDLE", "NEST",
    "SERENE", "FLICKER", "WANDER", "FLOAT", "MELODY",
    
    // Technology and Science Words
    "QUANTUM", "GALAXY", "ROBOT", "CYBER", "NEURAL",
    "ROCKET", "COMET", "LASER", "MATRIX", "PLASMA",
    "CIRCUIT", "NEBULA", "PHOTON", "BINARY", "SPARK",
    
    // Emotion and Abstract Words
    "DREAM", "HOPE", "WONDER", "SPIRIT", "PASSION",
    "COURAGE", "WISDOM", "HARMONY", "FREEDOM", "GRACE",
    
    // Adventure and Exploration Words
    "EXPLORE", "JOURNEY", "SUMMIT", "COMPASS", "VOYAGE",
    "HORIZON", "PIONEER", "QUEST", "DISCOVER", "TRAIL"
];

const HangmanGame = () => {
    const [currentWord, setCurrentWord] = useState("");
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        const newWord = wordList[Math.floor(Math.random() * wordList.length)];
        setCurrentWord(newWord);
        
        // Reveal 2-3 random letters as hints
        const numHints = Math.min(Math.floor(newWord.length / 3), 3);
        const possibleIndices = Array.from({ length: newWord.length }, (_, i) => i);
        const hintIndices = [];
        
        for (let i = 0; i < numHints; i++) {
            const randomIndex = Math.floor(Math.random() * possibleIndices.length);
            hintIndices.push(possibleIndices[randomIndex]);
            possibleIndices.splice(randomIndex, 1);
        }
        
        setRevealedLetters(hintIndices.map(index => ({
            letter: newWord[index],
            index: index
        })));
        
        setGuessedLetters([]);
        setWrongAttempts(0);
        setGameOver(false);
        setGameWon(false);
    };

    const handleGuess = (letter) => {
        if (guessedLetters.includes(letter) || gameOver) return;

        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);

        if (!currentWord.includes(letter)) {
            const newWrongAttempts = wrongAttempts + 1;
            setWrongAttempts(newWrongAttempts);
            if (newWrongAttempts >= 6) {
                setGameOver(true);
                setGameWon(false);
            }
        } else {
            // Check if all letters are either guessed or revealed as hints
            const isComplete = currentWord.split("").every(char => 
                newGuessedLetters.includes(char) || 
                revealedLetters.some(hint => hint.letter === char)
            );
            
            if (isComplete) {
                setGameWon(true);
                setGameOver(true);
            }
        }
    };

    // Add this new function
    const handlePopupClose = () => {
        setGameOver(false);
        resetGame(); // Reset the game when closing the popup
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 px-4 overflow-hidden">
            {/* Back Button with enhanced hover effect */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="fixed top-4 left-4 z-50 bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-lg shadow-lg"
            >
                <ArrowLeft size={20} /> Back
            </motion.button>

            {/* Main Container with subtle pulse animation */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl h-[80vh] bg-gradient-to-br from-gray-900/95 to-gray-800/95 p-4 sm:p-6 rounded-2xl shadow-2xl relative z-10 backdrop-blur-lg border border-indigo-500/20 overflow-hidden"
            >
                <div className="h-full flex flex-col lg:flex-row gap-6">
                    {/* Left Side */}
                    <div className="flex-1 flex flex-col items-center justify-center lg:border-r-2 lg:border-indigo-500/30 lg:pr-6">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl font-bold tracking-wide mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
                        >
                            Hangman
                        </motion.h1>
                        <p className="text-sm sm:text-base text-indigo-200 mb-6 text-center opacity-80">
                            Guess the word before you run out of attempts!
                        </p>

                        {/* Word Display with more dynamic styling */}
                        <div className="w-full max-w-md flex flex-wrap justify-center items-center bg-indigo-950/40 px-4 py-4 rounded-xl shadow-lg gap-2 border border-indigo-500/20">
                            {currentWord.split("").map((letter, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`text-2xl sm:text-3xl font-bold border-b-4 px-2 py-1 min-w-[28px] sm:min-w-[36px] text-center transition-all duration-300
                                        ${revealedLetters.some(hint => hint.index === index)
                                            ? "text-emerald-400 border-emerald-500/50"
                                            : guessedLetters.includes(letter)
                                                ? "text-white border-indigo-500/50"
                                                : "text-white border-indigo-500/50"
                                        }`}
                                >
                                    {revealedLetters.some(hint => hint.index === index) || guessedLetters.includes(letter)
                                        ? letter
                                        : "_"}
                                </motion.span>
                            ))}
                        </div>

                        {/* Score Counter with pulsing effect */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 w-full max-w-md flex items-center justify-center bg-indigo-950/40 px-4 py-3 rounded-xl text-lg font-semibold shadow-lg border border-indigo-500/20"
                        >
                            <Zap size={20} className="text-indigo-400 animate-pulse" />
                            <span className="ml-2 text-indigo-200">Attempts Left: <span className="text-indigo-400">{6 - wrongAttempts}</span></span>
                        </motion.div>
                    </div>

                    {/* Right Side - Keyboard with staggered animation */}
                    <div className="flex-1 flex justify-center items-center p-2 sm:p-4">
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-7 gap-1.5 sm:gap-2 w-full max-w-lg"
                        >
                            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, index) => (
                                <motion.button
                                    key={letter}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.5 },
                                        visible: { 
                                            opacity: 1, 
                                            scale: 1,
                                            transition: { 
                                                delay: index * 0.02,
                                                type: "spring",
                                                stiffness: 300
                                            }
                                        }
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleGuess(letter)}
                                    disabled={guessedLetters.includes(letter) || gameOver}
                                    className={`aspect-square w-full text-base sm:text-lg font-bold rounded-lg transition-all shadow-md border border-indigo-500/20
                                        ${guessedLetters.includes(letter)
                                            ? currentWord.includes(letter)
                                                ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400/30"
                                                : "bg-gradient-to-br from-rose-500 to-rose-600 text-white border-rose-400/30"
                                            : "bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white hover:shadow-lg"
                                        } ${gameOver ? "opacity-75" : ""}`}
                                >
                                    {letter}
                                </motion.button>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Game Over Popup with enhanced animation */}
            {gameOver && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
                >
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 300, 
                            damping: 15 
                        }}
                        className={`p-6 rounded-lg shadow-2xl text-center text-white text-xl sm:text-2xl font-bold w-[90%] max-w-md relative border ${gameWon
                            ? "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400/30"
                            : "bg-gradient-to-br from-rose-500 to-rose-600 border-rose-400/30"
                            }`}
                    >
                        <motion.button
                            whileHover={{ rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 rounded-full p-1 text-white transition-all"
                            onClick={handlePopupClose}
                        >
                            <XCircle size={24} />
                        </motion.button>
                        <p>{gameWon ? `🎉 You Won! The word was "${currentWord}".` : `💀 You Lost! The word was "${currentWord}".`}</p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default HangmanGame;
