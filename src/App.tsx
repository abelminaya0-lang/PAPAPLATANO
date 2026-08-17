import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Index } from "@/routes/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingScreen />
      <Index />
    </QueryClientProvider>
  );
}

export default App;
