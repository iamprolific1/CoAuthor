import { Mark, mergeAttributes, CommandProps } from "@tiptap/core";
import { RawCommands } from "@tiptap/core";

// Extend Mark to allow font-size and font-family styling
const FontStyle = Mark.create({
    name: "fontStyle",

    addAttributes() {
        return {
        fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
            if (!attributes.fontSize) return {};
            return { style: `font-size: ${attributes.fontSize}px;` };
            },
        },
        fontFamily: {
            default: null,
            parseHTML: (element) => element.style.fontFamily || null,
            renderHTML: (attributes) => {
            if (!attributes.fontFamily) return {};
            return { style: `font-family: ${attributes.fontFamily};` };
            },
        },
        };
    },

    parseHTML() {
        return [
            {
                tag: "span",
                getAttrs: (node) => {
                if (typeof node === "string") return false;
                const style = (node as HTMLElement).getAttribute("style");
                return style ? {} : false;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["span", mergeAttributes(HTMLAttributes), 0];
    },

    addCommands() {
        return {
        setFontSize:
            (size: string) =>
            ({ chain }: CommandProps) => {
            return chain().setMark(this.name, { fontSize: size }).run();
            },

        setFontFamily:
            (family: string) =>
            ({ chain }: CommandProps) => {
            return chain().setMark(this.name, { fontFamily: family }).run();
            },

        unsetFontStyle:
            () =>
            ({ chain }: CommandProps) => {
            return chain().unsetMark(this.name).run();
            },
        } as Partial<RawCommands>;
    },
});

export default FontStyle;
