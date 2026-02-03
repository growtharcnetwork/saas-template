import { Button } from "@/components/base/buttons/button";
import { useTheme } from "@/providers/theme-provider";

const SunIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M10 3.333V1.667M10 18.333V16.667M16.667 10H18.333M1.667 10H3.333M15.773 4.227L17.07 2.93M2.93 17.07L4.227 15.773M15.773 15.773L17.07 17.07M2.93 2.93L4.227 4.227M14.167 10C14.167 12.3012 12.3012 14.167 10 14.167C7.69881 14.167 5.83333 12.3012 5.83333 10C5.83333 7.69881 7.69881 5.83333 10 5.83333C12.3012 5.83333 14.167 7.69881 14.167 10Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M17.5 10.6583C17.3689 12.0768 16.8365 13.4287 15.9652 14.5567C15.0939 15.6847 13.9195 16.5422 12.5791 17.0284C11.2387 17.5146 9.78804 17.6096 8.39654 17.3037C7.00504 16.9978 5.72846 16.3039 4.72185 15.2973C3.71524 14.2907 3.02127 13.0141 2.7154 11.6226C2.40953 10.2311 2.50451 8.78045 2.99071 7.44005C3.47691 6.09965 4.33439 4.92522 5.46239 4.05392C6.59039 3.18262 7.94225 2.65019 9.36075 2.51904C8.51164 3.66458 8.11174 5.08147 8.23442 6.49529C8.3571 7.90911 8.99537 9.21842 10.0222 10.2452C11.049 11.272 12.3583 11.9103 13.7721 12.033C15.1859 12.1557 16.6028 11.7558 17.7483 10.9067L17.5 10.6583Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <Button
            color="secondary"
            size="md"
            iconLeading={isDark ? SunIcon : MoonIcon}
            onClick={toggleTheme}
            className="w-full"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? "Light Mode" : "Dark Mode"}
        </Button>
    );
};

