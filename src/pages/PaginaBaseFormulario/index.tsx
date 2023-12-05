import "./styles.css";

function PaginaBaseFormulario({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <div className="container__form">
                {children}
            </div>
        </main>
    )
}

export default PaginaBaseFormulario;