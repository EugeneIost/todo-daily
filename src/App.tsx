import { useEffect } from "react";
import TodoList from "./components/TodoList/TodoList";
import Container from "./components/UI/Container/Container";
import Header from "./components/UI/Header/Header";
import MainSectionWrapper from "./components/UI/MainSectionWrapper/MainSectionWrapper";
import Title from "./components/UI/Title/Title";
import TitlesWrapper from "./components/UI/TitlesWrapper/TitlesWrapper";
import todos from "./store/todos";

function App() {
  // Рендерится два раза в strict моде, костыли:
  useEffect(() => {
    const abortController = new AbortController();
    todos.fetchTodos(abortController);
    return () => abortController.abort();
  }, []);
  return (
    <Container>
      <Header />

      <MainSectionWrapper>
        <TitlesWrapper>
          <Title>Сегодня</Title>
          <Title>{new Date().toLocaleDateString("ru-RU")}</Title>
        </TitlesWrapper>

        <TodoList />
      </MainSectionWrapper>
    </Container>
  );
}

export default App;
