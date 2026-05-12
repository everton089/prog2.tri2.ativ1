const jsonFilePath = __dirname + '/data.temp.json';
const list: string[] = await loadFromFile();


async function loadFromFile() {
  try {
    const file = Bun.file(jsonFilePath);
    const content = await file.text();
    return JSON.parse(content) as string[];
  } catch (error: any) {
    if (error.code === 'ENOENT')
      return [];
    throw error;
  }
}


async function saveToFile() {
  try {
    await Bun.write(jsonFilePath, JSON.stringify(list));
  } catch (error: any) {
   throw new Error("Erro ao salvar os dados no arquivo: " + error.message);
  }
}


async function addItem(item: string) {
  list.push(item);
  await saveToFile();
}


async function getItems() {
  return list;
}


async function updateItem(index: number, newItem: string) {
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");
  list[index] = newItem;
  await saveToFile();
}


async function removeItem(index: number) {
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");
  list.splice(index, 1);
  await saveToFile();
}


export default { addItem, getItems, updateItem, removeItem };