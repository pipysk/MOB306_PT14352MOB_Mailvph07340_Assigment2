import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, Button, Modal, ImageBackground, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';



export default function Story({ Username }) {
    const APIStory = 'https://5e64622ea49c2100161069a0.mockapi.io/story';

    const [storys, setStory] = useState([]);
    const [listStory, setListStory] = useState(true);
    const [showLoad, setShowLoad] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [current, setCurrent] = useState({});

    // ---------------------- Khai Bao State ADD----------------------------

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [totail_chapters, setTotail_chapters] = useState('');
    const [is_Full, setIs_Full] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    // -----------------------END ADD--------------------------------------

    //-------DETAIL CALL API-----------------------------

    const fetchDetail = (id) => {
        return fetch(
            `${APIStory}/${id}`
        ).then((res) => res.json())
            .then((resJson) => {
                setShowDetail(true);
                setCurrent(resJson);
                setShowLoad(false);

            })
            .catch((error) => console.log(error));

    }
    const handleDetail = (id) => {
        setShowLoad(true);
        fetchDetail(id);
    }
    //---------------------------------------------

    //-----------------------------CALL API--------------------------------
    const fetchStory = () => {
        return fetch(APIStory,
            {

            }).then((res) => res.json())
            .then((resJson) => setStory(resJson))
            .catch((error) => console.log(error))
    };

    useEffect(
        () => {
            fetchStory()
        },
        [listStory]
    )
    // ---------------------------END CALL---------------------------------

    // ----------------------------DELETE API------------------------------
    const deleteStory = (id) => {
        const newStory = storys.filter(item => item.id != id);
        setStory(newStory);
    }
    const handleDelete = (id) => {
        Alert.alert(
            'DELETE',
            `Ban co muon xoa ${name}khong`,
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        setShowLoad(true);
                        deleteStory(id);

                        fetch(
                            `${APIStory}/${id}`,
                            { method: 'DELETE' }
                        ).then(() => {
                            setShowLoad(false);
                        })
                            .catch((error) => console.log(error));
                    }
                },
                {
                    text: 'No',
                    onPress: () => { }
                }
            ]
        )
        // setShowLoad(true);
        // deleteStory(id);


    }
    // ----------------------------END DETELE------------------------------
    function validateFrom() {
        if (name == '') {
            alert('Vui lòng nhập tên đầy đủ thông tin');
        } else if (category == '') {
            alert("Vui lòng nhập thể loại ");
        }
        else if (totail_chapters == "") {
            alert('Vui lòng nhập số chương')
        }
        else if (isNaN(totail_chapters)) {
            alert("Chương phải là số");
        } else {
            handleSubmit();
            setShowModal(false);
        }
    }
    // ----------------------------ADD AND UPDATE------------------------------
    const setModalData = (data) => {
        setImage(data.image);
        setName(data.name);
        setCategory(data.category);
        setTotail_chapters(data.totail_chapters);
        setIs_Full(data.is_Full);
        setIsUpdate(data.id);
    };

    const handleAddStory = (resJson) => {
        const newStorys = [...storys];
        return newStorys.push(resJson);
    };
    const handleUpdateStory = (resJson) => {
        const newStorys = [...storys];

        const updateStoryIndex = newStorys.findIndex(item => item.id = resJson.id);

        newStorys[updateStoryIndex];
        return newStorys;
    };

    const handleSubmit = () => {
        setShowLoad(true);
        setShowModal(false);

        const story = {
            image: image,
            name: name,
            category: category,
            totail_chapters: totail_chapters,
            is_Full: is_Full

        };

        const api = isUpdate ? `${APIStory}/${isUpdate}` : APIStory;
        fetch(
            api,
            {
                method: isUpdate ? 'PUT' : 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(story)
            }
        ).then(
            (res) => res.json()
        )
            .then(
                (resJson) => {
                    let newStorys = [];
                    if (isUpdate) {
                        newStorys = handleUpdateStory(resJson);
                    } else {
                        newStorys = handleAddStory(resJson);
                    }
                    setStory(newStorys);
                    fetchStory();
                    setShowLoad(false);
                }
            )
            .catch((error) => console.log(error));

        setModalData({
            image: '',
            name: '',
            category: '',
            totail_chapters: '',
            is_Full: ''
        });
    }
    const showEditModal = (id) => {
        const story = storys.find((item) => item.id == id);

        setModalData(story);
        setShowModal(true);
    }


    // ----------------------------END ADD AND UPDATE--------------------------
    // ----------------------------DETAIL------------------------------------------
    // const showDetailModail = (id) => {
    //     const story = storys.find((item) => item.id == id);

    //     setModalData(story);
    //     console.log(story);
    //     setShowDetail(true);
    // }
    // ---------------------------End-------------------------------------------------
    return (
        <View style={style.list}>
            <View>
                <View style={style.viewUsername}>
                    <Text style={style.textUsername}>{Username}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setShowModal(true)} style={style.btn}>
                        <Text style={{ textAlign: 'center', paddingVertical: 15, color: 'red', fontSize: 15 }}>{`Thêm Truyện`}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {showLoad ?
                        <Text>LOADDING.....</Text>
                        : null}
                </View>
            </View>

            <View >
                <ScrollView style={{ height: '100%' }}>
                    <FlatList
                        data={storys}
                        renderItem={({ item }) => (
                            <View style={style.line}>
                                <View style={style.row}>
                                    <View>
                                        <Image style={{ width: 50, height: 50, borderRadius: 50 }} source={{ uri: item.image }} />
                                    </View>
                                    <View>
                                        <View style={style.viewList}>
                                            <Text style={style.textList}>{`Ten Truyen`}</Text>
                                            <Text>{`: ${item.name}`}</Text>
                                        </View>
                                        <View style={style.viewList}>
                                            <Text style={style.textList}>{`The Loai`}</Text>
                                            <Text>{`: ${item.category}`}</Text>
                                        </View>
                                        <View style={style.viewList}>
                                            <Text style={style.textList}>{`So Chuong`}</Text>
                                            <Text>{`: ${item.totail_chapters}`}</Text>
                                        </View>
                                        <View style={style.viewList}>
                                            <Text style={style.textList}>{`Tinh Trang`}</Text>
                                            <Text >{item.is_Full ? "Còn Truyện" : "Hết Truyện"}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={style.row}>
                                    <View style={style.row2}>

                                        <TouchableOpacity onPress={() => showEditModal(item.id)} style={style.btnEdit}>
                                            <Text>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDelete(item.id)} style={style.btnEdit}>
                                            <Text>Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDetail(item.id)} style={style.btnEdit}>
                                            <Text>Detail</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, storys) => item.id}
                    />
                </ScrollView>
            </View>

            <View>
                {/* MODAL ADD AND UPDATE */}
                <Modal visible={showModal}>
                    <ImageBackground
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: "http://thuthuatphanmem.vn/uploads/2018/04/20/hinh-nen-bau-troi-dem-dep_022551353.jpg" }}
                    >
                        <View>
                            <View>
                                <Text style={style.textLine}>{`image URL`}</Text>
                                <TextInput style={style.textinput} value={image} onChangeText={(value) => setImage(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`Name`}</Text>
                                <TextInput style={style.textinput} value={name} onChangeText={(value) => setName(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`The Loai`}</Text>
                                <TextInput style={style.textinput} value={category} onChangeText={(value) => setCategory(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`So Chuong`}</Text>
                                <TextInput style={style.textinput} value={totail_chapters} onChangeText={(value) => setTotail_chapters(value)} />
                            </View>
                            <View>
                                <Text style={style.textLine}>{`TinhTrang`}</Text>
                                <Switch style={style.textinput} value={is_Full} onValueChange={() => setIs_Full(!is_Full)} />
                            </View>
                        </View>
                        <View>

                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <TouchableOpacity onPress={() => validateFrom()} style={style.btn}>
                                    <Text style={{ textAlign: 'center', paddingVertical: 15, color: 'red', fontSize: 15 }}>{`SUBMIT`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setShowModal(false) }} style={style.btn}>
                                    <Text style={{ textAlign: 'center', paddingVertical: 15, color: 'red', fontSize: 15 }}>{`CANCLE`}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ImageBackground>
                </Modal>

                {/* END */}
            </View>
            <View>
                <Modal visible={showDetail}>
                    <View style={{ flex: 1 }}>
                        <View>
                            <View style={{
                                height: '45%',
                                borderRadius: 20,
                                margin: 16,
                                marginTop: 86,
                                backgroundColor: '#e4e4e4',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    borderRadius: 20,
                                }} >

                                    <Image style={{ width: 100, height: 100, borderRadius: 50, display: 'flex', marginLeft: 'auto', marginRight: 'auto' }} source={{ uri: current.image }} />
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={style.textList} >{`Tên Truyện`}</Text>
                                    <Text>{`: ${current.name}`} </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={style.textList}>{`Thể Loại`}</Text>
                                    <Text>{`: ${current.category}`} </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={style.textList}>{`So chuong`}</Text>
                                    <Text>{`: ${current.totail_chapters}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={style.textList}>{`Trang Thai`}</Text>
                                    <Text>{`: ${current.is_Full} ? "Còn Truyện" : "Hết Truyện"`}</Text>
                                </View>
                            </View>
                        </View>
                        <Button
                            title='Cancle' onPress={() => { setShowDetail(false) }}
                        />
                    </View>
                </Modal>
            </View>
        </View>

    );
}
const style = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 10,
        marginHorizontal: 90,
        borderColor: '#424242',
        borderRadius: 20,
        backgroundColor: '#D3D3D3'
    },
    textuser: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#424242',
        fontStyle: 'normal',
        paddingVertical: 2,
        color: '#888985'
    },

    profileContainer: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 16,
        width: '100%',
        height: 150,
        padding: 24,
    },
    image: {},
    image: {
        width: 200,
        height: 200,
        borderRadius: 200
    },
    list: {
        backgroundColor: "#FFC0CB",
        maxHeight: 800,
    },
    viewUsername: {
        width: '100%',
        margin: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 50,
        borderColor: '#424242',
        backgroundColor: '#D3D3D3'
    },
    textUsername: {
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#424242',
        fontSize: 40,
        fontStyle: 'italic',
        // paddingVertical: 2,
        color: '#888985'
    },
    btn: {
        display: 'flex',

        backgroundColor: '#f78383',
        width: "50%",
        borderRadius: 15,
        borderColor: '#f78383',
        borderWidth: 1,
        alignItems: 'center',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    viewList: {
        flexDirection: 'row'
    },
    row: {
        padding: 15,
        width: 380,
        flexDirection: 'row'
    },
    row2: {
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row'
    },
    btnEdit: {
        marginRight: 10,
        width: 54,
        alignItems: 'center',
        borderColor: '#36abb5',
        backgroundColor: '#36abb5',
        color: 'white',
        borderRadius: 30,
        borderWidth: 1,
    },
    line: {
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: 15,
        borderColor: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#B2B2B2',
        borderRadius: 20
    },
    textLine: {
        borderTopWidth: 1,
        width: 80,
        textAlign: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        color: '#5F5F60',
        fontWeight: 'bold',
        fontSize: 15,
        borderColor: '#FFFFFF',
        marginTop: 50,
        backgroundColor: '#CBFAFE'
    },
    textinput: {

        color: "red",
        height: 50,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "blue",
        paddingHorizontal: 15
    },
    textList: {
        textDecorationLine: 'underline',
        color: '#ea526f',
        fontWeight: 'bold',

    }

});