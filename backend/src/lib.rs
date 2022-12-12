mod utils;

use js_sys;
use utils::set_panic_hook;
use wasm_bindgen::prelude::*;
// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn init() {
    set_panic_hook();
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, backend!");
}

#[wasm_bindgen]
pub fn funny_number() -> u32 {
    69
}

#[wasm_bindgen]
pub fn get_schedule_for_display(user: String) -> String {
    return (user + "not implemented yet").to_string();
}

// I spent way too long on getting this to work...
#[wasm_bindgen]
pub fn test_js_obj(obj: JsValue) -> Result<String, JsValue> {
    let value: Result<JsValue, JsValue> = js_sys::Reflect::get(&obj, &"name".into());
    if value.is_err() {
        return Err(value.err().unwrap());
    }
    let v: String = value.unwrap().as_string().unwrap();
    Ok(v)
}

// #[derive(Default)]
// #[wasm_bindgen]
// pub struct TestObj {
//     name: String,
//     pub test: i32,
// }

// maybe turn this into a macro?
// Why do we even need this?
// #[wasm_bindgen]
// impl TestObj {
//     #[wasm_bindgen(constructor)]
//     pub fn new() -> Self {
//         Self::default()
//     }
// }

#[wasm_bindgen(getter_with_clone)]
pub struct Foo {
    #[wasm_bindgen(js_name = "contents")]
    pub contents: String,
    pub name: String,
    pub age: Option<i32>,
}

#[wasm_bindgen]
impl Foo {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Foo {
        Foo {
            contents: "".to_string(),
            name: "".to_string(),
            age: None,
        }
    }

    pub fn get_contents(&self) -> String {
        return self.contents.clone();
    }
}

#[wasm_bindgen]
pub fn test_struct_obj(obj: Foo) -> String {
    return obj.name.to_string();
}

#[wasm_bindgen]
pub fn schedule_for(user: String) -> Foo {
    let mut foo = Foo::new();
    foo.contents = "test".to_string();
    foo.name = user;
    foo.age = Some(69);
    return foo;
}
