export class AlreadyExistException extends Error {
    public retornoJson: string;

    constructor(message: string, code?: string) {
        const retorno = JSON.stringify({ message, code });
        super(message);
        this.name = 'AlreadyExistException';
        this.retornoJson = retorno;
    }
}