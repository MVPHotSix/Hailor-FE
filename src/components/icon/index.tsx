interface IconProps {
    width: string
    height: string
    fill: string
}

export function ChevronDownIcon({ width, height, fill }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5.575 6.77501C5.44167 6.77501 5.31667 6.75417 5.2 6.71251C5.08333 6.67084 4.975 6.60001 4.875 6.50001L0.275 1.90001C0.0916667 1.71667 0 1.48334 0 1.20001C0 0.916673 0.0916667 0.683339 0.275 0.500006C0.458333 0.316673 0.691667 0.225006 0.975 0.225006C1.25833 0.225006 1.49167 0.316673 1.675 0.500006L5.575 4.40001L9.475 0.500006C9.65833 0.316673 9.89167 0.225006 10.175 0.225006C10.4583 0.225006 10.6917 0.316673 10.875 0.500006C11.0583 0.683339 11.15 0.916673 11.15 1.20001C11.15 1.48334 11.0583 1.71667 10.875 1.90001L6.275 6.50001C6.175 6.60001 6.06667 6.67084 5.95 6.71251C5.83333 6.75417 5.70833 6.77501 5.575 6.77501Z"
                fill={fill}
            />
        </svg>
    )
}

export function ChevronLeftIcon({ width, height, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 12 20" fill="none">
            <path
                d="M3.55001 10.0001L10.9 17.3501C11.15 17.6001 11.2708 17.8918 11.2625 18.2251C11.2542 18.5584 11.125 18.8501 10.875 19.1001C10.625 19.3501 10.3333 19.4751 10 19.4751C9.66668 19.4751 9.37501 19.3501 9.12501 19.1001L1.42501 11.4251C1.22501 11.2251 1.07501 11.0001 0.975012 10.7501C0.875012 10.5001 0.825012 10.2501 0.825012 10.0001C0.825012 9.75011 0.875012 9.50011 0.975012 9.25011C1.07501 9.00011 1.22501 8.77511 1.42501 8.57511L9.12501 0.87511C9.37501 0.62511 9.67085 0.504277 10.0125 0.51261C10.3542 0.520944 10.65 0.65011 10.9 0.90011C11.15 1.15011 11.275 1.44178 11.275 1.77511C11.275 2.10844 11.15 2.40011 10.9 2.65011L3.55001 10.0001Z"
                fill={fill}
            />
        </svg>
    )
}

export function GoogleLoginIcon({ width, height }: IconProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.9998 13.0909V19.2873H24.6106C24.2325 21.28 23.0978 22.9673 21.3961 24.1018L26.5888 28.131C29.6142 25.3383 31.3597 21.2365 31.3597 16.3638C31.3597 15.2292 31.2579 14.1382 31.0687 13.0911L15.9998 13.0909Z"
                fill="#4285F4"
            />
            <path
                d="M7.03292 19.0453L5.86177 19.9419L1.71625 23.1709C4.34897 28.3927 9.74493 32 15.9994 32C20.3193 32 23.9411 30.5745 26.5884 28.1309L21.3957 24.1018C19.9703 25.0618 18.1521 25.6437 15.9994 25.6437C11.8395 25.6437 8.30501 22.8364 7.03946 19.0546L7.03292 19.0453Z"
                fill="#34A853"
            />
            <path
                d="M1.71624 8.8291C0.625389 10.9817 0 13.4109 0 15.9999C0 18.589 0.625389 21.0181 1.71624 23.1707C1.71624 23.1852 7.03997 19.0398 7.03997 19.0398C6.71997 18.0798 6.53082 17.0617 6.53082 15.9997C6.53082 14.9378 6.71997 13.9197 7.03997 12.9597L1.71624 8.8291Z"
                fill="#FBBC05"
            />
            <path
                d="M15.9998 6.3709C18.3562 6.3709 20.4507 7.18543 22.1234 8.75636L26.7052 4.1746C23.927 1.58555 20.3198 0 15.9998 0C9.74526 0 4.34897 3.59272 1.71625 8.8291L7.03981 12.96C8.30519 9.17816 11.8398 6.3709 15.9998 6.3709Z"
                fill="#EA4335"
            />
        </svg>
    )
}

export function CrossIcon({ width, height, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 18 18" fill="none">
            <path
                d="M9 10.8667L2.46666 17.4001C2.22222 17.6445 1.91111 17.7667 1.53333 17.7667C1.15555 17.7667 0.844441 17.6445 0.599996 17.4001C0.355552 17.1556 0.23333 16.8445 0.23333 16.4667C0.23333 16.089 0.355552 15.7778 0.599996 15.5334L7.13333 9.00007L0.599996 2.46673C0.355552 2.22229 0.23333 1.91118 0.23333 1.5334C0.23333 1.15562 0.355552 0.84451 0.599996 0.600065C0.844441 0.355621 1.15555 0.233398 1.53333 0.233398C1.91111 0.233398 2.22222 0.355621 2.46666 0.600065L9 7.1334L15.5333 0.600065C15.7778 0.355621 16.0889 0.233398 16.4667 0.233398C16.8444 0.233398 17.1556 0.355621 17.4 0.600065C17.6444 0.84451 17.7667 1.15562 17.7667 1.5334C17.7667 1.91118 17.6444 2.22229 17.4 2.46673L10.8667 9.00007L17.4 15.5334C17.6444 15.7778 17.7667 16.089 17.7667 16.4667C17.7667 16.8445 17.6444 17.1556 17.4 17.4001C17.1556 17.6445 16.8444 17.7667 16.4667 17.7667C16.0889 17.7667 15.7778 17.6445 15.5333 17.4001L9 10.8667Z"
                fill={fill}
            />
        </svg>
    )
}

export function CalenderIcon({ width, height, fill }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 25" fill="none">
            <path
                d="M5 22.5C4.45 22.5 3.97917 22.3042 3.5875 21.9125C3.19583 21.5208 3 21.05 3 20.5V6.5C3 5.95 3.19583 5.47917 3.5875 5.0875C3.97917 4.69583 4.45 4.5 5 4.5H6V3.5C6 3.21667 6.09583 2.97917 6.2875 2.7875C6.47917 2.59583 6.71667 2.5 7 2.5C7.28333 2.5 7.52083 2.59583 7.7125 2.7875C7.90417 2.97917 8 3.21667 8 3.5V4.5H16V3.5C16 3.21667 16.0958 2.97917 16.2875 2.7875C16.4792 2.59583 16.7167 2.5 17 2.5C17.2833 2.5 17.5208 2.59583 17.7125 2.7875C17.9042 2.97917 18 3.21667 18 3.5V4.5H19C19.55 4.5 20.0208 4.69583 20.4125 5.0875C20.8042 5.47917 21 5.95 21 6.5V20.5C21 21.05 20.8042 21.5208 20.4125 21.9125C20.0208 22.3042 19.55 22.5 19 22.5H5ZM5 20.5H19V10.5H5V20.5Z"
                fill={fill}
            />
        </svg>
    )
}

export function SuccessIcon({ width, height }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 85 84" fill="none">
            <path
                d="M36.6667 49.6501L27.7084 40.6917C26.9445 39.9278 25.9723 39.5459 24.7917 39.5459C23.6112 39.5459 22.6389 39.9278 21.875 40.6917C21.1112 41.4556 20.7292 42.4278 20.7292 43.6084C20.7292 44.789 21.1112 45.7612 21.875 46.5251L33.75 58.4001C34.5834 59.2334 35.5556 59.6501 36.6667 59.6501C37.7778 59.6501 38.75 59.2334 39.5834 58.4001L63.125 34.8584C63.8889 34.0945 64.2709 33.1223 64.2709 31.9417C64.2709 30.7612 63.8889 29.789 63.125 29.0251C62.3612 28.2612 61.3889 27.8792 60.2084 27.8792C59.0278 27.8792 58.0556 28.2612 57.2917 29.0251L36.6667 49.6501ZM42.5 83.8167C36.7362 83.8167 31.3195 82.723 26.25 80.5355C21.1806 78.348 16.7709 75.3792 13.0209 71.6292C9.27087 67.8792 6.30212 63.4695 4.11462 58.4001C1.92712 53.3306 0.833374 47.914 0.833374 42.1501C0.833374 36.3862 1.92712 30.9695 4.11462 25.9001C6.30212 20.8306 9.27087 16.4209 13.0209 12.6709C16.7709 8.9209 21.1806 5.95215 26.25 3.76465C31.3195 1.57715 36.7362 0.483398 42.5 0.483398C48.2639 0.483398 53.6806 1.57715 58.75 3.76465C63.8195 5.95215 68.2292 8.9209 71.9792 12.6709C75.7292 16.4209 78.698 20.8306 80.8855 25.9001C83.073 30.9695 84.1667 36.3862 84.1667 42.1501C84.1667 47.914 83.073 53.3306 80.8855 58.4001C78.698 63.4695 75.7292 67.8792 71.9792 71.6292C68.2292 75.3792 63.8195 78.348 58.75 80.5355C53.6806 82.723 48.2639 83.8167 42.5 83.8167Z"
                fill="#6268A8"
            />
        </svg>
    )
}

export function FailureIcon({ width, height }: IconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 85 84" fill="none">
            <path
                d="M42.5 47.9082L54.5834 59.9915C55.3473 60.7554 56.3195 61.1374 57.5 61.1374C58.6806 61.1374 59.6528 60.7554 60.4167 59.9915C61.1806 59.2276 61.5625 58.2554 61.5625 57.0749C61.5625 55.8943 61.1806 54.9221 60.4167 54.1582L48.3334 42.0749L60.4167 29.9915C61.1806 29.2276 61.5625 28.2554 61.5625 27.0749C61.5625 25.8943 61.1806 24.9221 60.4167 24.1582C59.6528 23.3943 58.6806 23.0124 57.5 23.0124C56.3195 23.0124 55.3473 23.3943 54.5834 24.1582L42.5 36.2415L30.4167 24.1582C29.6528 23.3943 28.6806 23.0124 27.5 23.0124C26.3195 23.0124 25.3473 23.3943 24.5834 24.1582C23.8195 24.9221 23.4375 25.8943 23.4375 27.0749C23.4375 28.2554 23.8195 29.2276 24.5834 29.9915L36.6667 42.0749L24.5834 54.1582C23.8195 54.9221 23.4375 55.8943 23.4375 57.0749C23.4375 58.2554 23.8195 59.2276 24.5834 59.9915C25.3473 60.7554 26.3195 61.1374 27.5 61.1374C28.6806 61.1374 29.6528 60.7554 30.4167 59.9915L42.5 47.9082ZM42.5 83.7415C36.7362 83.7415 31.3195 82.6478 26.25 80.4603C21.1806 78.2728 16.7709 75.304 13.0209 71.554C9.27087 67.804 6.30212 63.3943 4.11462 58.3249C1.92712 53.2554 0.833374 47.8388 0.833374 42.0749C0.833374 36.311 1.92712 30.8943 4.11462 25.8249C6.30212 20.7554 9.27087 16.3457 13.0209 12.5957C16.7709 8.8457 21.1806 5.87695 26.25 3.68945C31.3195 1.50195 36.7362 0.408203 42.5 0.408203C48.2639 0.408203 53.6806 1.50195 58.75 3.68945C63.8195 5.87695 68.2292 8.8457 71.9792 12.5957C75.7292 16.3457 78.698 20.7554 80.8855 25.8249C83.073 30.8943 84.1667 36.311 84.1667 42.0749C84.1667 47.8388 83.073 53.2554 80.8855 58.3249C78.698 63.3943 75.7292 67.804 71.9792 71.554C68.2292 75.304 63.8195 78.2728 58.75 80.4603C53.6806 82.6478 48.2639 83.7415 42.5 83.7415Z"
                fill="#FF4D4D"
            />
        </svg>
    )
}
