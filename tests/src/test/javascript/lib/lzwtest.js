/**
 * Copyright (c) 2013-2014 Netflix, Inc.  All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * LZW output stream tests.
 * 
 * @author Wesley Miaw <wmiaw@netflix.com>
 */
describe("lzw$compress", function () {
    it("one byte", function () {
        var data = new Uint8Array([0x1f]);

        var compressed = lzw$compress(data);

        expect(compressed).not.toBeNull();
        expect(compressed.length).toEqual(1);
        expect(compressed[0]).toEqual(data[0]);
    });

    it("two bytes", function () {
        var data = new Uint8Array([0x66, 0x67]);
        // This compresses to 3 bytes: [ 0x66, 0x33, 0x80 ]

        var compressed = lzw$compress(data);

        expect(compressed).toBeNull();
    });

    it("three bytes", function () {
        var data = new Uint8Array([0x61, 0xd7, 0xb1]);
        // This compresses to 4 bytes: [ 0x61, 0x6b, 0xac, 0x40 ]

        var compressed = lzw$compress(data);

        expect(compressed).toBeNull();
    });
});

describe("lzw$uncompress", function () {
    it("one byte", function () {
        var codes = new Uint8Array([0xf1]);

        var uncompressed = lzw$uncompress(codes);

        expect(uncompressed[0]).toEqual(codes[0]);
    });

    it("two bytes", function () {
        var codes = new Uint8Array([0x66, 0x33, 0x80]);
        var data = new Uint8Array([0x66, 0x67]);

        var uncompressed = lzw$uncompress(codes);

        expect(uncompressed.length).toEqual(data.length);
        expect(new Uint8Array(uncompressed)).toEqual(data);
    });

    it("three bytes", function () {
        var codes = new Uint8Array([0x61, 0x6b, 0xac, 0x40]);
        var data = new Uint8Array([0x61, 0xd7, 0xb1]);

        var uncompressed = lzw$uncompress(codes);

        expect(uncompressed.length).toEqual(data.length);
        expect(new Uint8Array(uncompressed)).toEqual(data);
    });
});


describe("lzw", function () {
    it("compress then uncompress", function () {
        var data = new Uint8Array([
            0x3c, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x3e, 0x3c, 0x68, 0x65, 0x61, 0x64, 0x65, 0x72,
            0x3e, 0x3c, 0x70, 0x72, 0x65, 0x66, 0x65, 0x72, 0x72, 0x65, 0x64, 0x6c, 0x61, 0x6e, 0x67, 0x75,
            0x61, 0x67, 0x65, 0x73, 0x3e, 0x3c, 0x61, 0x70, 0x70, 0x73, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x65,
            0x64, 0x6c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x73, 0x3e, 0x3c, 0x6c, 0x61, 0x6e, 0x67,
            0x75, 0x61, 0x67, 0x65, 0x3e, 0x3c, 0x69, 0x6e, 0x64, 0x65, 0x78, 0x3e, 0x30, 0x3c, 0x2f, 0x69,
            0x6e, 0x64, 0x65, 0x78, 0x3e, 0x3c, 0x62, 0x63, 0x70, 0x34, 0x37, 0x3e, 0x65, 0x6e, 0x3c, 0x2f,
            0x62, 0x63, 0x70, 0x34, 0x37, 0x3e, 0x3c, 0x2f, 0x6c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67, 0x65,
            0x3e, 0x3c, 0x2f, 0x61, 0x70, 0x70, 0x73, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x65, 0x64, 0x6c, 0x61,
            0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x73, 0x3e, 0x3c, 0x2f, 0x70, 0x72, 0x65, 0x66, 0x65, 0x72,
            0x72, 0x65, 0x64, 0x6c, 0x61, 0x6e, 0x67, 0x75, 0x61, 0x67, 0x65, 0x73, 0x3e, 0x3c, 0x63, 0x6c,
            0x69, 0x65, 0x6e, 0x74, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x3e,
            0x3c, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x74, 0x69, 0x6d, 0x65, 0x3e, 0x31, 0x33, 0x36, 0x33,
            0x33, 0x39, 0x36, 0x33, 0x34, 0x37, 0x3c, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x74, 0x69,
            0x6d, 0x65, 0x3e, 0x3c, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x74, 0x69, 0x6d, 0x65, 0x3e, 0x31,
            0x33, 0x36, 0x33, 0x33, 0x39, 0x36, 0x33, 0x34, 0x37, 0x3c, 0x2f, 0x63, 0x6c, 0x69, 0x65, 0x6e,
            0x74, 0x74, 0x69, 0x6d, 0x65, 0x3e, 0x3c, 0x2f, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x73, 0x65,
            0x72, 0x76, 0x65, 0x72, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x3e, 0x3c, 0x2f, 0x68, 0x65, 0x61, 0x64,
            0x65, 0x72, 0x3e, 0x3c, 0x70, 0x69, 0x6e, 0x67, 0x2f, 0x3e, 0x3c, 0x2f, 0x72, 0x65, 0x71, 0x75,
            0x65, 0x73, 0x74, 0x3e
        ]);

        var compressed = lzw$compress(data);
        var uncompressed = lzw$uncompress(compressed);

        expect(new Uint8Array(uncompressed)).toEqual(data);
    });
});