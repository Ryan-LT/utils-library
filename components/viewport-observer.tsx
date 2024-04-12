import type { FunctionComponent, RefObject } from 'react';
import { useRef, useEffect, useState } from 'react';

export type ViewportObserverProps = {
    children: ({
        ref,
        isBelowViewport,
        isAboveViewport,
    }: {
        ref: RefObject<HTMLDivElement> | undefined;
        isBelowViewport: boolean;
        isAboveViewport: boolean;
    }) => JSX.Element;
    className?: string;
};

export const ViewportObserver: FunctionComponent<ViewportObserverProps> = ({
    children,
}) => {
    const [isBelowViewport, setIsBelowViewport] = useState(false);
    const [isAboveViewport, setIsAboveViewport] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observeElement = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isUnderViewPort =
                    entry.boundingClientRect.top > window.innerHeight;

                const isAboveViewPort =
                    entry.boundingClientRect.top < window.innerHeight;

                if (isUnderViewPort) {
                    setIsBelowViewport(true);
                } else {
                    setIsBelowViewport(false);
                }

                if (isAboveViewPort) {
                    setIsAboveViewport(true);
                } else {
                    setIsAboveViewport(false);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0,
            },
        );

        if (observeElement) {
            observer.observe(observeElement);
        }

        return () => {
            if (observeElement) {
                observer.unobserve(observeElement);
            }
        };
    }, []);

    return children({ isBelowViewport, isAboveViewport, ref });
};
