#1. Entrar no sistema
import pyautogui        
import time

pyautogui.PAUSE=1.5
link = "https://dlp.hashtagtreinamentos.com/python/intensivao/login"
email = "teste@teste.com"
pw = "1234"

pyautogui.press("win")
pyautogui.write("Chrome")
pyautogui.press("enter")
pyautogui.press("tab")
pyautogui.press("tab")
pyautogui.press("tab")
pyautogui.press("tab")
pyautogui.press("Enter")
pyautogui.click(x=606, y=78)
pyautogui.hotkey("ctrl", "a")
pyautogui.write(link)
pyautogui.press("Enter")
time.sleep(3)

#2. Login
pyautogui.click(x=769, y=505)
pyautogui.write(email)
pyautogui.press("tab")
pyautogui.write(pw)
pyautogui.press("tab")
pyautogui.press("Enter")
time.sleep(3)

#3. Importar DB
import pandas
tabela = pandas.read_csv("produtos.csv")
print(tabela)

#4. Cadastrar produto/ação
for linha in tabela.index:

    codigo = tabela.loc[linha, "codigo"]
    marca = tabela.loc[linha, "marca"]
    tipo = tabela.loc[linha, "tipo"]
    categoria = tabela.loc[linha, "categoria"]
    preco = tabela.loc[linha, "preco_unitario"]
    custo = tabela.loc[linha, "custo"]
    obs = tabela.loc[linha, "obs"]
    
    pyautogui.click(x=737, y=354)

    pyautogui.write(codigo)
    pyautogui.press("tab")

    pyautogui.write(marca)
    pyautogui.press("tab")

    pyautogui.write(tipo)
    pyautogui.press("tab")

    pyautogui.write(str(tabela.loc[linha, "categoria"]))
    pyautogui.press("tab")

    pyautogui.write(str(tabela.loc[linha, "preco_unitario"]))
    pyautogui.press("tab")

    pyautogui.write(str(tabela.loc[linha, "custo"]))
    pyautogui.press("tab")

    if not pandas.isna(obs):
        pyautogui.write(obs)
    pyautogui.press("tab")

    pyautogui.press("enter")
    #5. Repeat process.
    pyautogui.click(x=184, y=385)
    pyautogui.scroll(1200)


#Victor Forjaz
