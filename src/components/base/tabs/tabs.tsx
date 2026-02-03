import { Tabs as AriaTabs, TabList as AriaTabList, Tab as AriaTab, TabPanel as AriaTabPanel } from "react-aria-components";
import { cx } from "@/utils/cx";
import type { ReactNode } from "react";

// Simple tabs interface for declarative usage
interface SimpleTabsProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabChange: (id: string) => void;
    className?: string;
}

// Composable tabs interface
interface ComposableTabsProps {
    children: ReactNode;
    defaultSelectedKey?: string;
    selectedKey?: string;
    onSelectionChange?: (key: string) => void;
    className?: string;
}

type TabsComponentProps = SimpleTabsProps | ComposableTabsProps;

function isSimpleTabsProps(props: TabsComponentProps): props is SimpleTabsProps {
    return 'tabs' in props && Array.isArray(props.tabs);
}

export const Tabs = (props: TabsComponentProps) => {
    if (isSimpleTabsProps(props)) {
        const { tabs, activeTab, onTabChange, className } = props;
        return (
            <div className={cx("flex gap-1", className)}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cx(
                            "px-4 py-2 text-sm md:text-base font-semibold transition-colors cursor-pointer",
                            "border-b-2",
                            activeTab === tab.id
                                ? "border-brand-600 text-primary"
                                : "border-transparent text-tertiary hover:text-secondary hover:border-gray-300"
                        )}
                        aria-selected={activeTab === tab.id}
                        role="tab"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        );
    }

    const { children, defaultSelectedKey, selectedKey, onSelectionChange, className } = props;
    return (
        <AriaTabs
            defaultSelectedKey={defaultSelectedKey}
            selectedKey={selectedKey}
            onSelectionChange={onSelectionChange}
            className={cx("w-full", className)}
        >
            {children}
        </AriaTabs>
    );
};

interface TabListProps {
    children: ReactNode;
    className?: string;
}

export const TabList = ({ children, className }: TabListProps) => {
    return (
        <AriaTabList className={cx("flex gap-1 border-b border-secondary", className)}>
            {children}
        </AriaTabList>
    );
};

interface TabProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const Tab = ({ id, children, className }: TabProps) => {
    return (
        <AriaTab
            id={id}
            className={cx(
                "px-4 py-2 text-sm md:text-base font-semibold text-tertiary transition-colors cursor-pointer",
                "border-b-2 border-transparent",
                "hover:text-secondary",
                "selected:border-brand-600 selected:text-primary",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
                className
            )}
        >
            {children}
        </AriaTab>
    );
};

interface TabPanelProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const TabPanel = ({ id, children, className }: TabPanelProps) => {
    return (
        <AriaTabPanel id={id} className={cx("mt-4", className)}>
            {children}
        </AriaTabPanel>
    );
};
