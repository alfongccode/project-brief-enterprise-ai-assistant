import os
from pinecone import Pinecone
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


async def new_query(text):
    pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
    PINECONE_INDEX_NAME = "enterprise-ai-assistant"
    index = pc.Index(PINECONE_INDEX_NAME)
    embeddings = OpenAIEmbeddings(api_key=os.getenv("OPENAI_API_KEY"))
    vectorstore = PineconeVectorStore(index=index, embedding=embeddings)

    llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))

    prompt = ChatPromptTemplate.from_template(
        "Answer the question using only this context:\n\n{context}\n\nQuestion: {input}"
    )

    combine = create_stuff_documents_chain(llm, prompt)
    chain = create_retrieval_chain(vectorstore.as_retriever(search_kwargs={"k": 4}), combine)

    response = chain.invoke({"input": text})
    print(response["answer"])