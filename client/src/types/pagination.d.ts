import "@tiptap/core";

export interface PaginationOptions {
    pageHeight: number;
    pageWidth: number;
    pageMargin: number;
}

declare module "tiptap-pagination-breaks" {
    interface Command<ReturnType> {
        pagination: {
            /**
             * set pagination options
             */
            setPaginationOptions: (options: Partial<PaginationOptions>)=> ReturnType;
        }
    }
}