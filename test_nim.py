from langchain_nvidia_ai_endpoints import ChatNVIDIA
llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct")
try:
    response = llm.invoke("Hello world")
    print(response.content)
except Exception as e:
    print(f"ERROR: {e}")
