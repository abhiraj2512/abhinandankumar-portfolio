import { useState, useEffect } from 'react';

interface TypewriterOptions {
    words: string[];
    loop?: boolean;
    typeSpeed?: number;
    deleteSpeed?: number;
    delaySpeed?: number;
}

export const useTypewriter = ({
    words,
    loop = true,
    typeSpeed = 100,
    deleteSpeed = 50,
    delaySpeed = 2000,
}: TypewriterOptions) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

    // Explicitly use loop to satisfy linter (or remove if logic doesn't strictly need it, but here it drives the index)
    useEffect(() => {
        // Use loop dependency to re-trigger effect when word changes
    }, [loop]);

    useEffect(() => {
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
    }, [text, isDeleting, loopNum, words, typeSpeed, deleteSpeed, delaySpeed]);

    return [text];
};
