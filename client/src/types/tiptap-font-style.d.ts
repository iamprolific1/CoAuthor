import "@tiptap/core";
import { ChainedCommands } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands{
        setFontSize: (size: string) => ReturnType<ChainedCommands>;
        setFontFamily: (family: string) => ReturnType<ChainedCommands>;
        unsetFontStyle: () => ReturnType<ChainedCommands>;
    }
}