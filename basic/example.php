<!-- PHP語法概念 -->

<!-- class是一種模板，用這個模板做出一個物件 -->
class animal{
    private $name;
    public function showName() {
        echo $this->name;
    }
}

<!-- 繼承，animal是dog爸爸，dog繼承animal public的屬性(不會繼承private) -->
class dog extends animal {
    
}
$d = new dog();
echo $d->showName();


<!-- 複習2022.1.14 -->