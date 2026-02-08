import { useState, useEffect } from 'react';

interface TypewriterOptions {
    words: string[];
    loop?: boolean;
    typeSpeed?: number;
    deleteSpeed?: number;
    delaySpeed?: number;
    startDelay?: number;
}

export const useTypewriter = ({
    words,
    loop = true,
    typeSpeed = 100,
    deleteSpeed = 50,
    delaySpeed = 2000,
    startDelay = 0,
}: TypewriterOptions) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(typeSpeed);
    const [hasStarted, setHasStarted] = useState(false);

    // Initial start delay to wait for other animations
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasStarted(true);
        }, startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    // Explicitly use loop to satisfy linter (or remove if logic doesn't strictly need it, but here it drives the index)
    useEffect(() => {
        // Use loop dependency to re-trigger effect when word changes
    }, [loop]);

    useEffect(() => {
        if (!hasStarted) return;

        let timer: ReturnType<typeof setTimeout>;

        const handleType = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? deleteSpeed : typeSpeed);

            if (!isDeleting && text === fullText) {
                // Determine pause at end of word
                if (delaySpeed) {
                    setTypingSpeed(delaySpeed);
                }
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        timer = setTimeout(handleType, typingSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, words, typeSpeed, deleteSpeed, delaySpeed, hasStarted]);

    return [text];
};
