import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Button, StyleSheet, Alert, Image, Modal } from 'react-native';

export default function storyItem({ item, handle_DeleteItem }) {
    const [showModal, setShowModal] = useState(false);
    const alertDelete = (key, handle_DeleteItem) => {
        return Alert.alert(
            'Xóa', // tham so dau tien: title
            `Bạn có muốn xóa ${item.name} không?`, // tham so t2: content
            [
                {
                    text: 'Yes',
                    onPress: () => { handle_DeleteItem(key) }
                },
                {
                    text: 'No',
                    onPress: () => { }
                }
            ],
            { cancleable: false } // cho click ra ben ngoai alert hay khong (true -> disable)
        )
    };

    return (
        <View>

            <View style={style.line}>

                <View style={style.row}>

                    <View style={style.image}>

                        <Image source={{ uri: item.avatar }}
                            style={{ width: 50, height: 65, borderRadius: 40 }} />

                    </View>

                    <View style={style.info}>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.name}>{`Tên truyện`}</Text>
                            <Text>{`: ${item.name}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.name}>{`Thể loại`}</Text>
                            <Text>{`: ${item.category}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.name}>{`Số chương`}</Text>
                            <Text>{`: ${item.total_chapters}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={style.name}>{`Tên truyện`}</Text>
                            <Text>{`: ${item.status ? "Còn" : "Hết"}`}</Text>
                        </View>



                    </View>
                </View>
                <View style={style.row}>
                    <View style={style.row2} >

                        <TouchableOpacity style={style.btnDetail} onPress={() => setShowModal(true)}>

                            <Text style={style.txt} >Detail</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={style.btnDelete} onPress={() => { alertDelete(item.key, handle_DeleteItem) }}>

                            <Text style={style.txt}>Delete</Text>

                        </TouchableOpacity>

                    </View>
                </View>
            </View>
            <View>
                <Modal visible={showModal}>
                    <View style={{ flex: 1, }}>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                borderRadius: 20,
                            }} >
                                <Image source={{ uri: item.avatar }}
                                    style={{ width: 50, height: 50, borderRadius: 50 }} />
                            </View>
                            <View style={{
                                height: '45%',
                                borderRadius: 20,
                                margin: 16,
                                marginTop: 86,
                                backgroundColor: '#e4e4e4',
                            }}>
                                
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={style.name} >{`Tên Truyện`}</Text>
                                    <Text>{`: ${item.name}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={style.name}>{`Thể Loại`}</Text>
                                    <Text>{`: ${item.category}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={style.name}>{`Tình Trạng`}</Text>
                                    <Text>{`: ${item.status ? "con" : 'Het'}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={style.name}>{`Nội dung`}</Text>
                                    <Text style={{paddingVertical:10,paddingHorizontal:20}}>{`  ${item.content}`}</Text>
                                </View>


                            </View>

                            <Button
                                title='Cancle' onPress={() => { setShowModal(false) }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}
const style = StyleSheet.create({
    row: {
        padding: 15,
        width: 380,
        flexDirection: 'row'


    },
    line: {

        borderWidth: 1,
        marginVertical: 10,

        borderColor: '#FFFFFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#B2B2B2',
        borderRadius: 20
    },
    text: {
        fontWeight: 'bold',
        color: '#ffff',
    },
    image: {

        height: 100,
        width: 100,
        borderRadius: 20,
    },
    info: {

    },
    name: {
        textDecorationLine: 'underline',
        color: '#ea526f',
        fontWeight: 'bold',
    },
    row2: {
        flexDirection: 'row',


    },
    btnDelete: {
        marginLeft: 20,
        width: 54,
        alignItems: 'center',
        borderColor: '#36abb5',
        backgroundColor: '#36abb5',
        color: 'white',
        borderRadius: 30,
        borderWidth: 1,
    },
    btnDetail: {
        marginRight: 10,
        width: 54,
        alignItems: 'center',
        borderColor: '#36abb5',
        backgroundColor: '#36abb5',
        color: 'white',
        borderRadius: 30,
        borderWidth: 1,
    }
});
